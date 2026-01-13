import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PenTool, 
  CheckCircle2, 
  Download, 
  Building2,
  User,
  FileCheck,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { SignaturePad } from './SignaturePad';
import { useCartaAdhesionPDF } from '@/hooks/useCartaAdhesionPDF';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface SignatureData {
  fullName: string;
  position: string;
  organizationName: string;
  taxId: string;
  signatureDataUrl: string | null;
  acceptTerms: boolean;
  acceptGdpr: boolean;
  signedAt: Date | null;
}

export const ContractSignatureSection = () => {
  const { t } = useTranslation('contract');
  const { generatePDF, downloading } = useCartaAdhesionPDF();
  const [isSigning, setIsSigning] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof SignatureData, string>>>({});
  
  const [signatureData, setSignatureData] = useState<SignatureData>({
    fullName: '',
    position: '',
    organizationName: '',
    taxId: '',
    signatureDataUrl: null,
    acceptTerms: false,
    acceptGdpr: false,
    signedAt: null
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SignatureData, string>> = {};

    if (!signatureData.fullName.trim()) {
      newErrors.fullName = t('signature.validation.nameRequired');
    }
    if (!signatureData.position.trim()) {
      newErrors.position = t('signature.validation.positionRequired');
    }
    if (!signatureData.organizationName.trim()) {
      newErrors.organizationName = t('signature.validation.organizationRequired');
    }
    if (!signatureData.taxId.trim()) {
      newErrors.taxId = t('signature.validation.taxIdRequired');
    }
    if (!signatureData.signatureDataUrl) {
      newErrors.signatureDataUrl = t('signature.validation.signatureRequired');
    }
    if (!signatureData.acceptTerms) {
      newErrors.acceptTerms = t('signature.validation.termsRequired');
    }
    if (!signatureData.acceptGdpr) {
      newErrors.acceptGdpr = t('signature.validation.gdprRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSign = async () => {
    if (!validateForm()) {
      toast.error('Por favor, complete todos los campos requeridos');
      return;
    }

    setIsSigning(true);
    
    // Simulate signing process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSignatureData(prev => ({
      ...prev,
      signedAt: new Date()
    }));
    
    setIsSigning(false);
    setIsSigned(true);

    // Celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    toast.success(t('signature.success.title'), {
      description: t('signature.success.description')
    });
  };

  const updateField = (field: keyof SignatureData, value: any) => {
    setSignatureData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSigned) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-green-500/50 bg-green-500/5">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto"
              >
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </motion.div>
              
              <div>
                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {t('signature.success.title')}
                </h3>
                <p className="text-muted-foreground mt-2">
                  {t('signature.success.description')}
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('signature.fullName')}:</span>
                  <span className="font-medium">{signatureData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('signature.organizationName')}:</span>
                  <span className="font-medium">{signatureData.organizationName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('signature.signedAt')}:</span>
                  <span className="font-medium">
                    {signatureData.signedAt?.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button onClick={generatePDF} disabled={downloading} size="lg" className="mt-4">
                <Download className="mr-2 h-5 w-5" />
                {downloading ? t('downloadingPdf') : t('signature.success.downloadSigned')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <PenTool className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                {t('signature.title')}
                <Sparkles className="h-5 w-5 text-yellow-500" />
              </CardTitle>
              <CardDescription>{t('signature.description')}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Signer Data */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <User className="h-4 w-4" />
              {t('signature.signerData')}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t('signature.fullName')} *</Label>
                <Input
                  id="fullName"
                  value={signatureData.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder={t('signature.fullNamePlaceholder')}
                  className={errors.fullName ? 'border-destructive' : ''}
                />
                {errors.fullName && (
                  <p className="text-xs text-destructive">{errors.fullName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">{t('signature.position')} *</Label>
                <Input
                  id="position"
                  value={signatureData.position}
                  onChange={(e) => updateField('position', e.target.value)}
                  placeholder={t('signature.positionPlaceholder')}
                  className={errors.position ? 'border-destructive' : ''}
                />
                {errors.position && (
                  <p className="text-xs text-destructive">{errors.position}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizationName">{t('signature.organizationName')} *</Label>
                <Input
                  id="organizationName"
                  value={signatureData.organizationName}
                  onChange={(e) => updateField('organizationName', e.target.value)}
                  placeholder={t('signature.organizationNamePlaceholder')}
                  className={errors.organizationName ? 'border-destructive' : ''}
                />
                {errors.organizationName && (
                  <p className="text-xs text-destructive">{errors.organizationName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxId">{t('signature.taxId')} *</Label>
                <Input
                  id="taxId"
                  value={signatureData.taxId}
                  onChange={(e) => updateField('taxId', e.target.value)}
                  placeholder={t('signature.taxIdPlaceholder')}
                  className={errors.taxId ? 'border-destructive' : ''}
                />
                {errors.taxId && (
                  <p className="text-xs text-destructive">{errors.taxId}</p>
                )}
              </div>
            </div>
          </div>

          {/* Signature Pad */}
          <div className="space-y-2">
            <Label>{t('signature.signatureLabel')} *</Label>
            <SignaturePad 
              onSignatureChange={(dataUrl) => updateField('signatureDataUrl', dataUrl)}
            />
            {errors.signatureDataUrl && (
              <p className="text-xs text-destructive">{errors.signatureDataUrl}</p>
            )}
          </div>

          {/* Checkboxes */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="acceptTerms"
                checked={signatureData.acceptTerms}
                onCheckedChange={(checked) => updateField('acceptTerms', checked)}
              />
              <div className="space-y-1">
                <Label htmlFor="acceptTerms" className="font-medium cursor-pointer">
                  {t('signature.acceptTerms')} *
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t('signature.acceptTermsDescription')}
                </p>
                {errors.acceptTerms && (
                  <p className="text-xs text-destructive">{errors.acceptTerms}</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="acceptGdpr"
                checked={signatureData.acceptGdpr}
                onCheckedChange={(checked) => updateField('acceptGdpr', checked)}
              />
              <div className="space-y-1">
                <Label htmlFor="acceptGdpr" className="font-medium cursor-pointer">
                  {t('signature.acceptGdpr')} *
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t('signature.acceptGdprDescription')}
                </p>
                {errors.acceptGdpr && (
                  <p className="text-xs text-destructive">{errors.acceptGdpr}</p>
                )}
              </div>
            </div>
          </div>

          {/* Sign Button */}
          <Button
            onClick={handleSign}
            disabled={isSigning}
            size="lg"
            className="w-full"
          >
            {isSigning ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2"
                >
                  <FileCheck className="h-5 w-5" />
                </motion.div>
                {t('signature.signing')}
              </>
            ) : (
              <>
                <PenTool className="mr-2 h-5 w-5" />
                {t('signature.signContract')}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
