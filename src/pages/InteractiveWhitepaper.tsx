import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Database, 
  Shield, 
  Fingerprint, 
  Globe2, 
  Coins, 
  Eye, 
  ShieldCheck, 
  Activity, 
  Award,
  Sparkles,
  Lock,
  Unlock,
  BrainCircuit,
  Server,
  Wallet,
  CheckCircle2,
  XCircle,
  Network
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import DataLineageBlockchain from '@/components/DataLineageBlockchain';

const TOTAL_SLIDES = 10;

// Slide components
const SlideVision = ({ onStart }: { onStart: () => void }) => (
  <div className="text-center space-y-8">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", duration: 0.8 }}
      className="inline-flex p-6 rounded-full bg-primary/10 mb-4"
    >
      <Sparkles className="h-16 w-16 text-primary" />
    </motion.div>
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-5xl md:text-7xl font-bold"
    >
      El Futuro de <span className="procuredata-gradient">tus Datos</span>
    </motion.h1>
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="text-xl text-muted-foreground max-w-2xl mx-auto"
    >
      Bienvenido a la era de la <strong>Soberanía de Datos</strong>. 
      Donde tú decides quién accede, cuándo y cómo se usan tus datos.
      Prepárate para un viaje de 10 pasos que transformará tu visión.
    </motion.p>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
    >
      <Button size="lg" onClick={onStart} className="h-14 px-10 text-lg gap-2">
        Iniciar Viaje <ArrowRight className="h-5 w-5" />
      </Button>
    </motion.div>
  </div>
);

const SlideProblema = () => (
  <div className="space-y-8">
    <h2 className="text-4xl font-bold text-center">El Problema Actual</h2>
    <p className="text-center text-muted-foreground max-w-2xl mx-auto">
      Tus datos están fragmentados en silos, sin control ni visibilidad sobre quién los utiliza.
    </p>
    <div className="grid md:grid-cols-2 gap-8 mt-8">
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <XCircle className="h-5 w-5" /> Modelo Tradicional
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div 
            className="flex flex-col gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {['Datos en múltiples sistemas', 'Sin trazabilidad', 'Pérdida de control', 'Vulnerabilidades de seguridad'].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.15 }}
                className="flex items-center gap-2 p-3 bg-destructive/10 rounded-lg"
              >
                <Lock className="h-4 w-4 text-destructive" />
                <span className="text-sm">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
      
      <Card className="border-green-500/50 bg-green-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-5 w-5" /> Modelo PROCUREDATA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div 
            className="flex flex-col gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {['Datos federados y conectados', 'Trazabilidad blockchain', 'Control total del usuario', 'Cifrado end-to-end'].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.15 + 0.3 }}
                className="flex items-center gap-2 p-3 bg-green-500/10 rounded-lg"
              >
                <Unlock className="h-4 w-4 text-green-600" />
                <span className="text-sm">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const SlideArquitectura = () => {
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);
  
  const blocks = [
    { id: 'supabase', label: 'Supabase (Web2)', desc: 'Base de datos relacional, autenticación, y lógica de negocio', icon: Database, color: 'bg-blue-500' },
    { id: 'pontus', label: 'Pontus-X (Web3)', desc: 'Blockchain para identidad descentralizada y trazabilidad inmutable', icon: Globe2, color: 'bg-purple-500' },
    { id: 'euroe', label: 'EUROe Token', desc: 'Stablecoin regulada para pagos instantáneos 1:1 con Euro', icon: Coins, color: 'bg-green-500' },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-center">Arquitectura Híbrida</h2>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto">
        Lo mejor de Web2 y Web3 trabajando en armonía. Pasa el mouse sobre cada bloque para más detalles.
      </p>
      
      <div className="flex flex-col items-center gap-4 mt-8">
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl">
          {blocks.map((block) => (
            <motion.div
              key={block.id}
              onHoverStart={() => setHoveredBlock(block.id)}
              onHoverEnd={() => setHoveredBlock(null)}
              whileHover={{ scale: 1.05, y: -5 }}
              className="cursor-pointer"
            >
              <Card className={`h-full transition-all ${hoveredBlock === block.id ? 'ring-2 ring-primary shadow-lg' : ''}`}>
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${block.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <block.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{block.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimatePresence>
                    {hoveredBlock === block.id && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm text-muted-foreground text-center"
                      >
                        {block.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full max-w-4xl h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full"
        />
        
        <Badge variant="secondary" className="text-sm py-2 px-4">
          <Network className="h-4 w-4 mr-2" />
          Conexión Segura TLS 1.3 + Cifrado E2E
        </Badge>
      </div>
    </div>
  );
};

const SlideSSI = () => {
  const [did, setDid] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const generateDID = () => {
    setGenerating(true);
    setTimeout(() => {
      const randomHex = Array.from({ length: 40 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      setDid(`did:ethr:0x7ecc:0x${randomHex}`);
      setGenerating(false);
      toast.success("¡DID Generado!", { description: "Tu identidad descentralizada está lista" });
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-center">Tu Identidad Digital (SSI)</h2>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto">
        Self-Sovereign Identity: Una identidad que tú controlas, sin intermediarios.
      </p>
      
      <Card className="max-w-xl mx-auto">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Fingerprint className="h-10 w-10 text-primary" />
          </div>
          <CardTitle>Generador de DID</CardTitle>
          <CardDescription>
            Haz clic para simular la creación de tu Identificador Descentralizado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!did ? (
            <Button 
              onClick={generateDID} 
              disabled={generating}
              className="w-full h-14 text-lg"
            >
              {generating ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Wallet className="h-5 w-5" />
                </motion.div>
              ) : (
                <>
                  <Fingerprint className="h-5 w-5 mr-2" />
                  Generar mi DID
                </>
              )}
            </Button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Tu DID:</p>
                <code className="text-sm font-mono break-all text-green-600">{did}</code>
              </div>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                <span>Verificable criptográficamente en la red Pontus-X</span>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const SlidePontusX = () => (
  <div className="space-y-8">
    <h2 className="text-4xl font-bold text-center">La Red Pontus-X</h2>
    <p className="text-center text-muted-foreground max-w-2xl mx-auto">
      Una red blockchain europea, parte del ecosistema Gaia-X, diseñada para la soberanía de datos.
    </p>
    
    <div className="relative max-w-3xl mx-auto p-8">
      {/* Network visualization */}
      <div className="grid grid-cols-3 gap-8">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring" }}
            className="aspect-square"
          >
            <div className={`w-full h-full rounded-full flex items-center justify-center ${
              i === 4 ? 'bg-primary text-primary-foreground' : 'bg-muted'
            }`}>
              <Server className={`${i === 4 ? 'h-8 w-8' : 'h-5 w-5 text-muted-foreground'}`} />
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
        {[[0,4], [1,4], [2,4], [3,4], [5,4], [6,4], [7,4], [8,4]].map(([from, to], i) => (
          <motion.line
            key={i}
            x1={`${(from % 3) * 33 + 16.5}%`}
            y1={`${Math.floor(from / 3) * 33 + 16.5}%`}
            x2="50%"
            y2="50%"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted-foreground/30"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: i * 0.1 + 0.5, duration: 0.5 }}
          />
        ))}
      </svg>
    </div>
    
    <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
      {[
        { label: 'Inmutabilidad', desc: 'Los registros no pueden alterarse' },
        { label: 'Transparencia', desc: 'Auditoría pública verificable' },
        { label: 'Descentralización', desc: 'Sin punto único de fallo' },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 + i * 0.2 }}
        >
          <Card className="text-center p-4">
            <h4 className="font-semibold">{item.label}</h4>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
);

const SlideEUROe = () => (
  <div className="space-y-8">
    <h2 className="text-4xl font-bold text-center">Economía del Token: EUROe</h2>
    <p className="text-center text-muted-foreground max-w-2xl mx-auto">
      Un stablecoin regulado donde 1 Token = 1 Euro, siempre.
    </p>
    
    <div className="flex justify-center">
      <motion.div
        animate={{ 
          rotateY: [0, 360],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative"
      >
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-2xl">
          <span className="text-5xl font-bold text-white">€</span>
        </div>
      </motion.div>
    </div>
    
    <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            Respaldo Total
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Cada token está respaldado 1:1 por euros en cuentas bancarias auditadas.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Coins className="h-5 w-5 text-green-500" />
            Sin Volatilidad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            A diferencia de Bitcoin o Ethereum, el valor es estable y predecible.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
);

const SlidePrivacidad = () => {
  const [settings, setSettings] = useState({
    profileVisible: true,
    accessAlerts: true,
    anonymousResearch: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success("Configuración actualizada", {
      description: `${key === 'profileVisible' ? 'Visibilidad del perfil' : key === 'accessAlerts' ? 'Alertas de acceso' : 'Investigación anónima'} ${settings[key] ? 'desactivado' : 'activado'}`
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-center">Privacidad y Control</h2>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto">
        Tú decides. Prueba a activar y desactivar estos controles en tiempo real.
      </p>
      
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Panel de Control de Privacidad
          </CardTitle>
          <CardDescription>Configura quién puede ver y usar tus datos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Perfil Público</Label>
              <p className="text-xs text-muted-foreground">Tu perfil es visible para otras organizaciones</p>
            </div>
            <Switch 
              checked={settings.profileVisible} 
              onCheckedChange={() => toggleSetting('profileVisible')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Alertas de Acceso</Label>
              <p className="text-xs text-muted-foreground">Notificaciones cuando accedan a tus datos</p>
            </div>
            <Switch 
              checked={settings.accessAlerts} 
              onCheckedChange={() => toggleSetting('accessAlerts')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Investigación Anónima</Label>
              <p className="text-xs text-muted-foreground">Permitir uso agregado para mejoras del sistema</p>
            </div>
            <Switch 
              checked={settings.anonymousResearch} 
              onCheckedChange={() => toggleSetting('anonymousResearch')}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SlideTrazabilidad = () => (
  <div className="space-y-8">
    <h2 className="text-4xl font-bold text-center">Trazabilidad (Data Lineage)</h2>
    <p className="text-center text-muted-foreground max-w-2xl mx-auto">
      Cada acceso a tus datos queda registrado de forma inmutable. Mira un ejemplo real:
    </p>
    <div className="max-w-3xl mx-auto">
      <DataLineageBlockchain />
    </div>
  </div>
);

const SlideSeguridad = () => {
  const [attempts, setAttempts] = useState(0);
  const [blocked, setBlocked] = useState(false);

  const simulateAttack = () => {
    if (blocked) return;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    
    if (newAttempts >= 5) {
      setBlocked(true);
      toast.error("¡Intruso Bloqueado!", {
        description: "Rate limiting activado: 5 intentos máximos"
      });
    } else {
      toast.warning(`Intento ${newAttempts}/5`, {
        description: "El escudo está vigilando..."
      });
    }
  };

  const reset = () => {
    setAttempts(0);
    setBlocked(false);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-center">Seguridad: Rate Limiting</h2>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto">
        Mini-juego: Intenta "hackear" el sistema. Después de 5 intentos... 🛡️
      </p>
      
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <motion.div
            animate={blocked ? { 
              scale: [1, 1.2, 1],
              backgroundColor: ['var(--destructive)', 'var(--primary)', 'var(--destructive)']
            } : {}}
            transition={{ duration: 0.5 }}
            className={`w-32 h-32 rounded-full flex items-center justify-center ${
              blocked ? 'bg-green-500' : 'bg-primary/10'
            }`}
          >
            {blocked ? (
              <ShieldCheck className="h-16 w-16 text-white" />
            ) : (
              <Shield className="h-16 w-16 text-primary" />
            )}
          </motion.div>
          
          {!blocked && (
            <motion.div
              className="absolute -right-4 -top-4"
              animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <div className="w-10 h-10 bg-destructive rounded-full flex items-center justify-center text-white text-xl">
                👤
              </div>
            </motion.div>
          )}
        </div>
        
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">
            Intentos: {attempts}/5
          </p>
          <Progress value={(attempts / 5) * 100} className="w-48 mx-auto" />
        </div>
        
        <div className="flex gap-4">
          {!blocked ? (
            <Button onClick={simulateAttack} variant="destructive">
              Simular Ataque 💀
            </Button>
          ) : (
            <Button onClick={reset} variant="outline">
              Reiniciar Demo
            </Button>
          )}
        </div>
        
        {blocked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge variant="default" className="text-lg py-2 px-4 bg-green-500">
              ✓ Sistema Protegido
            </Badge>
            <p className="text-sm text-muted-foreground mt-2">
              El rate limiting ha bloqueado los intentos maliciosos
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const SlideCertificacion = ({ onComplete }: { onComplete: () => void }) => (
  <div className="text-center space-y-8">
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", duration: 1 }}
    >
      <div className="inline-flex p-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-2xl">
        <Award className="h-24 w-24 text-white" />
      </div>
    </motion.div>
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Badge className="mb-4 py-2 px-6 text-lg bg-gradient-to-r from-yellow-500 to-amber-500">
        🎉 ¡Felicidades!
      </Badge>
      <h2 className="text-4xl font-bold mb-4">
        Experto Certificado en <span className="procuredata-gradient">Soberanía de Datos</span>
      </h2>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
        Has completado el Whitepaper Interactivo v3.0. Ahora entiendes cómo PROCUREDATA 
        revoluciona la gestión y monetización de datos industriales.
      </p>
    </motion.div>
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="flex flex-col sm:flex-row justify-center gap-4"
    >
      <Button size="lg" onClick={onComplete} asChild className="h-14 px-10 text-lg">
        <Link to="/dashboard">
          Ir al Dashboard <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
      <Button size="lg" variant="outline" asChild className="h-14 px-10 text-lg">
        <Link to="/auth">
          Crear mi Cuenta
        </Link>
      </Button>
    </motion.div>
  </div>
);

// Main component
export default function InteractiveWhitepaper() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [started, setStarted] = useState(false);

  const progress = started ? ((currentSlide + 1) / TOTAL_SLIDES) * 100 : 0;

  const handleNext = () => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleStart = () => {
    setStarted(true);
    setCurrentSlide(1);
  };

  const handleComplete = () => {
    toast.success("¡Badge desbloqueado!", {
      description: "Has completado el Whitepaper Interactivo"
    });
  };

  const slideContent = [
    <SlideVision key="vision" onStart={handleStart} />,
    <SlideProblema key="problema" />,
    <SlideArquitectura key="arquitectura" />,
    <SlideSSI key="ssi" />,
    <SlidePontusX key="pontusx" />,
    <SlideEUROe key="euroe" />,
    <SlidePrivacidad key="privacidad" />,
    <SlideTrazabilidad key="trazabilidad" />,
    <SlideSeguridad key="seguridad" />,
    <SlideCertificacion key="certificacion" onComplete={handleComplete} />,
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with progress */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="procuredata-gradient">PROCUREDATA</span>
            <Badge variant="outline" className="text-xs">WHITEPAPER v3.0</Badge>
          </Link>
          
          {started && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                Nivel de Comprensión Técnica
              </span>
              <div className="w-32 sm:w-48">
                <Progress value={progress} className="h-2" />
              </div>
              <Badge variant="secondary">{Math.round(progress)}%</Badge>
            </div>
          )}
          
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Link>
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {slideContent[currentSlide]}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation footer */}
      {started && currentSlide > 0 && currentSlide < TOTAL_SLIDES - 1 && (
        <footer className="border-t bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrev}
              disabled={currentSlide <= 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>
            
            <div className="flex gap-1">
              {[...Array(TOTAL_SLIDES)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentSlide ? 'bg-primary' : i < currentSlide ? 'bg-primary/50' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            
            <Button onClick={handleNext}>
              Siguiente
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </footer>
      )}
    </div>
  );
}
