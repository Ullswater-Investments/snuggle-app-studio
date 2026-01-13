import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, KeyRound, Shield, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { SignaturePad } from './SignaturePad';

export type SignatureMethod = 'simple' | 'certificate' | 'eidas';

export interface SignatureResult {
  method: SignatureMethod;
  signatureDataUrl?: string;
  certificateInfo?: {
    serial?: string;
    issuer?: string;
    fileName?: string;
  };
  eidasProvider?: string;
  eidasLevel: 'simple' | 'advanced' | 'qualified';
}

interface DigitalSignatureWidgetProps {
  onSignatureComplete: (result: SignatureResult) => void;
  isProcessing?: boolean;
  className?: string;
}

export const DigitalSignatureWidget = ({
  onSignatureComplete,
  isProcessing = false,
  className
}: DigitalSignatureWidgetProps) => {
  const { t } = useTranslation('contract');
  const [activeTab, setActiveTab] = useState<SignatureMethod>('simple');
  const [simpleSignature, setSimpleSignature] = useState<string | null>(null);
  
  // Certificate state
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [certificatePassword, setCertificatePassword] = useState('');
  const [certificateProcessing, setCertificateProcessing] = useState(false);
  
  // eIDAS state
  const [eidasProvider, setEidasProvider] = useState<string | null>(null);
  const [eidasConnecting, setEidasConnecting] = useState(false);
  const [eidasSuccess, setEidasSuccess] = useState(false);

  const handleSimpleSign = () => {
    if (simpleSignature) {
      onSignatureComplete({
        method: 'simple',
        signatureDataUrl: simpleSignature,
        eidasLevel: 'simple'
      });
    }
  };

  const handleCertificateSign = async () => {
    if (!certificateFile || !certificatePassword) return;
    
    setCertificateProcessing(true);
    
    // Simulate certificate processing (MVP mock)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSignatureComplete({
      method: 'certificate',
      certificateInfo: {
        fileName: certificateFile.name,
        serial: 'MOCK-' + Math.random().toString(36).substring(7).toUpperCase(),
        issuer: 'FNMT Clase 2 CA (Simulated)'
      },
      eidasLevel: 'advanced'
    });
    
    setCertificateProcessing(false);
  };

  const handleEidasSign = async (provider: 'autofirma' | 'viafirma' | 'clave') => {
    setEidasProvider(provider);
    setEidasConnecting(true);
    
    // Simulate eIDAS provider connection (MVP mock)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setEidasConnecting(false);
    setEidasSuccess(true);
    
    onSignatureComplete({
      method: 'eidas',
      eidasProvider: provider,
      eidasLevel: 'qualified'
    });
  };

  const getEidasLevelBadge = (level: 'simple' | 'advanced' | 'qualified') => {
    const colors = {
      simple: 'bg-amber-100 text-amber-800 border-amber-200',
      advanced: 'bg-blue-100 text-blue-800 border-blue-200',
      qualified: 'bg-green-100 text-green-800 border-green-200'
    };
    
    const labels = {
      simple: t('signature.levelSimple', 'Simple'),
      advanced: t('signature.levelAdvanced', 'Avanzada'),
      qualified: t('signature.levelQualified', 'Cualificada')
    };
    
    return (
      <span className={cn('px-2 py-0.5 text-xs font-medium rounded-full border', colors[level])}>
        eIDAS: {labels[level]}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("space-y-4", className)}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          {t('signature.qualifiedTitle', 'Firma Electrónica')}
        </h3>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as SignatureMethod)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="simple" className="flex items-center gap-2">
            <PenTool className="h-4 w-4" />
            <span className="hidden sm:inline">{t('signature.tabSimple', 'Simple')}</span>
          </TabsTrigger>
          <TabsTrigger value="certificate" className="flex items-center gap-2">
            <KeyRound className="h-4 w-4" />
            <span className="hidden sm:inline">{t('signature.tabCertificate', 'Certificado')}</span>
          </TabsTrigger>
          <TabsTrigger value="eidas" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">{t('signature.tabEidas', 'eIDAS')}</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Simple Signature */}
        <TabsContent value="simple" className="space-y-4 mt-4">
          <Alert variant="default" className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              {t('signature.simpleWarning', 'Esta firma tiene valor indicativo. Para validez legal completa, use firma cualificada.')}
            </AlertDescription>
          </Alert>
          
          <div className="flex items-center gap-2 mb-2">
            {getEidasLevelBadge('simple')}
          </div>
          
          <SignaturePad 
            onSignatureChange={setSimpleSignature}
            className="border rounded-lg p-4 bg-background"
          />
          
          <Button
            onClick={handleSimpleSign}
            disabled={!simpleSignature || isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('signature.processing', 'Procesando...')}
              </>
            ) : (
              t('signature.signSimple', 'Firmar con firma simple')
            )}
          </Button>
        </TabsContent>

        {/* Tab 2: Certificate Signature */}
        <TabsContent value="certificate" className="space-y-4 mt-4">
          <Alert variant="default" className="border-blue-200 bg-blue-50">
            <KeyRound className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              {t('signature.certificateInfo', 'Suba su certificado digital FNMT o DNIe en formato .p12 o .pfx')}
            </AlertDescription>
          </Alert>
          
          <div className="flex items-center gap-2 mb-2">
            {getEidasLevelBadge('advanced')}
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="certificate">{t('signature.certificateLabel', 'Certificado (.p12/.pfx)')}</Label>
              <Input
                id="certificate"
                type="file"
                accept=".p12,.pfx"
                onChange={(e) => setCertificateFile(e.target.files?.[0] || null)}
                className="cursor-pointer"
              />
              {certificateFile && (
                <p className="text-sm text-muted-foreground">
                  📄 {certificateFile.name}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cert-password">{t('signature.passwordLabel', 'Contraseña del certificado')}</Label>
              <Input
                id="cert-password"
                type="password"
                value={certificatePassword}
                onChange={(e) => setCertificatePassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            
            <Button
              onClick={handleCertificateSign}
              disabled={!certificateFile || !certificatePassword || certificateProcessing || isProcessing}
              className="w-full"
            >
              {certificateProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('signature.validatingCertificate', 'Validando certificado...')}
                </>
              ) : (
                t('signature.signWithCertificate', 'Firmar con certificado')
              )}
            </Button>
          </div>
        </TabsContent>

        {/* Tab 3: eIDAS Provider */}
        <TabsContent value="eidas" className="space-y-4 mt-4">
          <Alert variant="default" className="border-green-200 bg-green-50">
            <Shield className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {t('signature.eidasInfo', 'Firma cualificada con máxima validez legal según Reglamento eIDAS (UE) 910/2014')}
            </AlertDescription>
          </Alert>
          
          <div className="flex items-center gap-2 mb-2">
            {getEidasLevelBadge('qualified')}
          </div>

          <AnimatePresence mode="wait">
            {eidasConnecting ? (
              <motion.div
                key="connecting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-8 space-y-4"
              >
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">
                  {t('signature.connectingProvider', 'Conectando con pasarela de firma...')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {eidasProvider === 'autofirma' && 'AutoFirma'}
                  {eidasProvider === 'viafirma' && 'Viafirma'}
                  {eidasProvider === 'clave' && 'Cl@ve Firma'}
                </p>
              </motion.div>
            ) : eidasSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8 space-y-4"
              >
                <div className="rounded-full bg-green-100 p-4">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
                <p className="text-lg font-medium text-green-700">
                  {t('signature.signedSuccessfully', 'Documento firmado correctamente')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('signature.qualifiedSignatureApplied', 'Firma electrónica cualificada aplicada')}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="options"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                <Button
                  variant="outline"
                  onClick={() => handleEidasSign('autofirma')}
                  disabled={isProcessing}
                  className="w-full justify-start h-auto py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                      <span className="text-lg font-bold text-red-600">@</span>
                    </div>
                    <div className="text-left">
                      <p className="font-medium">AutoFirma</p>
                      <p className="text-xs text-muted-foreground">
                        {t('signature.autofirmaDesc', 'Cliente oficial de firma del Gobierno de España')}
                      </p>
                    </div>
                  </div>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleEidasSign('clave')}
                  disabled={isProcessing}
                  className="w-full justify-start h-auto py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <span className="text-lg font-bold text-blue-600">🔑</span>
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Cl@ve Firma</p>
                      <p className="text-xs text-muted-foreground">
                        {t('signature.claveDesc', 'Sistema de identificación electrónica español')}
                      </p>
                    </div>
                  </div>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleEidasSign('viafirma')}
                  disabled={isProcessing}
                  className="w-full justify-start h-auto py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <span className="text-lg font-bold text-purple-600">V</span>
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Viafirma</p>
                      <p className="text-xs text-muted-foreground">
                        {t('signature.viafirmaDesc', 'Proveedor de servicios de confianza cualificado')}
                      </p>
                    </div>
                  </div>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};
