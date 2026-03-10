

## Analysis

After thorough code review, the success stories routes (`/success-stories` and `/success-stories/:id`) are already defined **outside** any `ProtectedRoute` wrapper (lines 962-966 in `App.tsx`). However, they use `AppLayout` which includes `AppSidebar` and `SidebarWorkspaceSwitcher` — components that call auth-dependent hooks (`useOrganizationContext`, `useIsDataSpaceOwner`). While these hooks handle unauthenticated state gracefully in theory, the full app layout may create confusion or subtle issues for unauthenticated users.

## Plan

### 1. Create a `PublicAppLayout` component
A lightweight layout specifically for public pages that reuses the `UnifiedHeader` (which already handles unauthenticated users with a login button) but **excludes** the sidebar, `AIConcierge`, `CommandMenu`, and `DemoTour` — all of which are auth-oriented.

```text
PublicAppLayout
├── UnifiedHeader (already handles auth/unauth)
└── <main> Outlet </main>
```

### 2. Update routes in `App.tsx`
Change the success stories routes (lines 962-966) from using `AppLayout` to using the new `PublicAppLayout`:

```tsx
// Before
<Route element={<AppLayout />}>
  <Route path="/success-stories" ... />
  <Route path="/success-stories/:id" ... />
</Route>

// After
<Route element={<PublicAppLayout />}>
  <Route path="/success-stories" ... />
  <Route path="/success-stories/:id" ... />
</Route>
```

This guarantees:
- No auth-dependent sidebar components are loaded
- No accidental redirects from auth-related hooks
- The header still shows brand, institutional logos, and a login button for users who want to sign in
- Success stories remain fully public and directly accessible from the landing page

