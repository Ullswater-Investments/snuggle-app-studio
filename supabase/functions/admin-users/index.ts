import { createClient } from "https://esm.sh/@supabase/supabase-js@2.81.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // --- Auth: verify caller is DSO or admin ---
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Caller client (respects RLS)
    const callerClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } =
      await callerClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const callerId = claimsData.claims.sub as string;

    // Admin client (bypasses RLS)
    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Check caller is DSO or admin
    const { data: callerRoles } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", callerId);

    const isDSO = (callerRoles ?? []).some(
      (r: any) => r.role === "data_space_owner"
    );
    const isAdmin = (callerRoles ?? []).some((r: any) => r.role === "admin");
    if (!isDSO && !isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ========== POST: delete user ==========
    if (req.method === "POST") {
      const body = await req.json();
      const targetId = body.userId as string;
      if (!targetId) {
        return new Response(
          JSON.stringify({ error: "userId is required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Safety checks
      const { data: targetRoles } = await adminClient
        .from("user_roles")
        .select("role")
        .eq("user_id", targetId);
      if ((targetRoles ?? []).some((r: any) => r.role === "data_space_owner")) {
        return new Response(
          JSON.stringify({ error: "Cannot delete a Data Space Owner" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { count: profileCount } = await adminClient
        .from("user_profiles")
        .select("id", { count: "exact", head: true })
        .eq("user_id", targetId);
      if ((profileCount ?? 0) > 0) {
        return new Response(
          JSON.stringify({
            error: "Cannot delete user with organization memberships",
          }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { count: txCount } = await adminClient
        .from("data_transactions")
        .select("id", { count: "exact", head: true })
        .eq("requested_by", targetId);
      if ((txCount ?? 0) > 0) {
        return new Response(
          JSON.stringify({
            error: "Cannot delete user with linked transactions",
          }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { error: deleteError } =
        await adminClient.auth.admin.deleteUser(targetId);
      if (deleteError) {
        return new Response(
          JSON.stringify({ error: deleteError.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ========== GET: check for orgId param ==========
    const url = new URL(req.url);
    const orgId = url.searchParams.get("orgId");

    if (orgId) {
      // Return members of a specific organization with emails from auth
      const [profilesRes, rolesRes] = await Promise.all([
        adminClient.from("user_profiles").select("user_id, full_name").eq("organization_id", orgId),
        adminClient.from("user_roles").select("user_id, role").eq("organization_id", orgId),
      ]);
      const orgProfiles = profilesRes.data ?? [];
      const orgRoles = rolesRes.data ?? [];
      const userIds = [...new Set([
        ...orgProfiles.map((p: any) => p.user_id),
        ...orgRoles.map((r: any) => r.user_id),
      ])];

      const members = await Promise.all(userIds.map(async (uid: string) => {
        const { data } = await adminClient.auth.admin.getUserById(uid);
        const role = orgRoles.find((r: any) => r.user_id === uid);
        const profile = orgProfiles.find((p: any) => p.user_id === uid);
        return {
          id: uid,
          email: data.user?.email ?? null,
          fullName: profile?.full_name ?? data.user?.user_metadata?.full_name ?? null,
          role: role?.role ?? "viewer",
        };
      }));

      return new Response(JSON.stringify({ members }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ========== GET: list all users ==========
    const {
      data: { users: authUsers },
      error: listError,
    } = await adminClient.auth.admin.listUsers({ perPage: 1000 });
    if (listError) throw listError;

    // Fetch profiles, roles, transaction counts, approval history, governance logs in parallel
    const [profilesRes, rolesRes, txCountsRes, approvalsRes, govLogsRes] =
      await Promise.all([
        adminClient.from("user_profiles").select("user_id, full_name, organization_id, organizations(id, name)"),
        adminClient.from("user_roles").select("user_id, role, organization_id"),
        adminClient.from("data_transactions").select("requested_by"),
        adminClient.from("approval_history").select("actor_user_id, transaction_id, action, notes, created_at").order("created_at", { ascending: false }),
        adminClient.from("governance_logs").select("actor_id, category, level, message, created_at").order("created_at", { ascending: false }),
      ]);

    const profiles = profilesRes.data ?? [];
    const roles = rolesRes.data ?? [];
    const allTx = txCountsRes.data ?? [];
    const allApprovals = approvalsRes.data ?? [];
    const allGovLogs = govLogsRes.data ?? [];

    // Also fetch recent transactions per user
    const txRes = await adminClient
      .from("data_transactions")
      .select("id, status, purpose, created_at, consumer_org_id, holder_org_id, subject_org_id, requested_by")
      .order("created_at", { ascending: false })
      .limit(500);
    const recentTx = txRes.data ?? [];

    // Build user objects
    const users = authUsers.map((au: any) => {
      const uid = au.id;

      // Organizations from profiles
      const userProfiles = profiles.filter((p: any) => p.user_id === uid);
      const orgs = userProfiles.map((p: any) => {
        const orgName = (p as any).organizations?.name ?? "Desconocida";
        const orgId = p.organization_id;
        const userRole = roles.find(
          (r: any) => r.user_id === uid && r.organization_id === orgId
        );
        return {
          id: orgId,
          name: orgName,
          role: userRole?.role ?? "viewer",
        };
      });

      // Deduplicate orgs by id
      const uniqueOrgs = Array.from(
        new Map(orgs.map((o: any) => [o.id, o])).values()
      );

      const isDso = roles.some(
        (r: any) => r.user_id === uid && r.role === "data_space_owner"
      );

      const txCount = allTx.filter(
        (t: any) => t.requested_by === uid
      ).length;

      const approvalHistory = allApprovals
        .filter((a: any) => a.actor_user_id === uid)
        .slice(0, 20);

      const governanceLogs = allGovLogs
        .filter((g: any) => g.actor_id === uid)
        .slice(0, 20);

      const userRecentTx = recentTx
        .filter((t: any) => t.requested_by === uid)
        .slice(0, 10);

      const fullName =
        userProfiles[0]?.full_name ??
        au.user_metadata?.full_name ??
        au.user_metadata?.nombre ??
        null;

      return {
        id: uid,
        email: au.email ?? "",
        fullName,
        createdAt: au.created_at,
        lastSignIn: au.last_sign_in_at ?? null,
        organizations: uniqueOrgs,
        isDataSpaceOwner: isDso,
        hasOrganizations: uniqueOrgs.length > 0,
        transactionCount: txCount,
        approvalHistory,
        governanceLogs,
        recentTransactions: userRecentTx,
      };
    });

    return new Response(JSON.stringify({ users }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("admin-users error:", err);
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
