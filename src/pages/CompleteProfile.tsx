import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { kycService } from "@/services/kycService";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  LogOut,
  ShieldCheck,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const CompleteProfile = () => {
  const { signOut, user, refreshProfile, profileComplete } = useAuth();
  const { i18n } = useTranslation();

  const [isVerifying, setIsVerifying] = useState(false);
  const [kycUrl, setKycUrl] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [loadingSession, setLoadingSession] = useState(false);
  const [sessionError, setSessionError] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState(false);

  const fetchKycSession = async () => {
    setLoadingSession(true);
    setSessionError(false);
    try {
      const { session } = await kycService.createKycSession(i18n.language);
      setKycUrl(session.url);
      setSessionId(session.session_id);
    } catch {
      setSessionError(true);
    } finally {
      setLoadingSession(false);
    }
  };

  const handleStartVerification = () => {
    setIsVerifying(true);
    fetchKycSession();
  };

  const handleCheckProfile = async () => {
    setCheckingProfile(true);
    try {
      await refreshProfile();
    } catch {
      // refreshProfile navigates on success; if it fails the user stays here
    } finally {
      setCheckingProfile(false);
    }
  };

  const handleKycComplete = useCallback(async () => {
    if (!sessionId) return;
    setSyncing(true);
    setSyncError(false);
    try {
      await kycService.refreshKycSession(sessionId);
      await refreshProfile();
    } catch {
      setSyncError(true);
      setSyncing(false);
    }
  }, [sessionId, refreshProfile]);

  useEffect(() => {
    if (!kycUrl || !sessionId) return;

    const handler = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== "object") return;

      const data = event.data as { type?: string; data?: { status?: string } };

      if (data.type === "didit:completed") {
        setCountdown(3);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [kycUrl, sessionId]);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown <= 0) {
      setCountdown(null);
      handleKycComplete();
      return;
    }
    const timer = setTimeout(
      () => setCountdown((c) => (c !== null ? c - 1 : null)),
      1000,
    );
    return () => clearTimeout(timer);
  }, [countdown, handleKycComplete]);

  if (profileComplete) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      {/* Decorative geometric elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/10 rotate-45 transform" />
      <div className="absolute bottom-1/4 left-1/4 w-24 h-24 border-2 border-primary/20 rotate-12 transform" />

      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border mb-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <ProcuredataLogo size="md" />

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="gap-2 text-muted-foreground"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Centered content */}
      <div className="flex items-center justify-center px-4 min-h-[calc(100vh-3.5rem)] relative z-10 pb-10">
        <Card
          className={`w-full shadow-xl border-0 bg-[linear-gradient(rgb(6,151,224),rgb(6,95,217))] backdrop-blur-sm transition-all min-h-[380px] ${isVerifying ? "max-w-2xl" : "max-w-lg"}`}
        >
          {/* Phase 1: Welcome */}
          {!isVerifying && (
            <>
              <CardHeader className="text-center pb-10">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
                  <ShieldCheck className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-3xl font-semibold text-white">
                  Completar tu perfil
                </CardTitle>
                <CardDescription className="text-base text-white/80">
                  Para continuar usando la plataforma, debes verificar tu
                  identidad mediante el proceso KYC.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="bg-white/10 border border-white/20 rounded-xl p-6 flex flex-col items-center gap-5">
                  <p className="text-sm text-white/80 text-center">
                    El proceso tomará menos de 2 minutos. Ten tu documento de
                    identidad a mano.
                  </p>
                  <Button
                    className="w-full bg-white text-[rgb(6,95,217)] hover:bg-white/90 font-semibold"
                    size="lg"
                    onClick={handleStartVerification}
                  >
                    Comenzar verificación
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {/* Phase 2: Verification */}
          {isVerifying && (
            <>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
                  <ShieldCheck className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-white">
                  Verificación de identidad
                </CardTitle>
                <CardDescription className="text-base text-white/80">
                  Completa el proceso para acceder a la plataforma.
                </CardDescription>
              </CardHeader>

              <CardContent className="py-6 space-y-4">
                {/* Loading session */}
                {loadingSession && !kycUrl && !sessionError && (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-white" />
                    <p className="text-sm text-white/80">
                      Iniciando verificación...
                    </p>
                  </div>
                )}

                {/* Session creation error */}
                {sessionError && !syncing && !syncError && (
                  <div className="flex flex-col items-center justify-center">
                    <div className="bg-white/10 border border-white/30 rounded-lg p-4 flex items-start gap-3 w-full">
                      <AlertCircle className="h-5 w-5 text-red-300 mt-0.5 shrink-0" />
                      <p className="text-sm text-white">
                        No se pudo crear la sesión KYC.
                      </p>
                    </div>
                    <Button
                      className="mt-6 bg-white text-[rgb(6,95,217)] hover:bg-white/90 font-semibold"
                      onClick={fetchKycSession}
                    >
                      Intentar de nuevo
                    </Button>
                  </div>
                )}

                {/* Syncing overlay */}
                {syncing && !syncError && (
                  <div className="flex flex-col items-center justify-center py-20 gap-6">
                    <div className="relative">
                      <div className="flex size-20 items-center justify-center rounded-full bg-white/15">
                        <CheckCircle2 className="size-10 text-white/50" />
                      </div>
                    </div>
                    <p className="text-base font-medium text-white">
                      Procesando verificación...
                    </p>
                    <div className="flex items-center justify-center ">
                      <Loader2 className="size-8 animate-spin text-white" />
                    </div>
                    <p className="text-sm text-white/60">
                      No cierres esta ventana.
                    </p>
                  </div>
                )}

                {/* Sync error */}
                {syncError && (
                  <div className="flex flex-col items-center justify-center">
                    <div className="bg-white/10 border border-white/30 rounded-lg p-4 flex items-start gap-3 w-full">
                      <AlertCircle className="h-5 w-5 text-red-300 mt-0.5 shrink-0" />
                      <p className="text-sm text-white">
                        No se pudo sincronizar la verificación.
                      </p>
                    </div>
                    <Button
                      className="mt-6 bg-white text-[rgb(6,95,217)] hover:bg-white/90 font-semibold"
                      onClick={handleKycComplete}
                    >
                      Intentar de nuevo
                    </Button>
                  </div>
                )}

                {/* Countdown after Didit completes */}
                {countdown !== null && !syncing && !syncError && (
                  <div className="flex flex-col items-center justify-center py-20 gap-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/15">
                      <CheckCircle2 className="h-10 w-10 text-white" />
                    </div>
                    <p className="text-lg font-semibold text-white">
                      ¡Verificación completada!
                    </p>
                    <p className="text-sm text-white/70">
                      Procesando en {countdown}…
                    </p>
                  </div>
                )}

                {/* Iframe (hidden when countdown, syncing or sync error) */}
                {kycUrl && countdown === null && !syncing && !syncError && (
                  <>
                    <div className="bg-white rounded-lg overflow-hidden">
                      <iframe
                        src={kycUrl}
                        className="w-full aspect-video h-[600px] border-0"
                        allow="camera; microphone"
                        title="Verificación de identidad"
                      />
                    </div>

                    <div className="text-center space-y-3 pt-2">
                      <p className="text-sm text-white/80">
                        ¿Todavía no? Si ya completaste la verificación, haz clic
                        para comprobar.
                      </p>
                      <Button
                        className="bg-white text-[rgb(6,95,217)] hover:bg-white/90 font-semibold"
                        onClick={handleCheckProfile}
                        disabled={checkingProfile}
                      >
                        {checkingProfile && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Comprobar ahora
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CompleteProfile;
