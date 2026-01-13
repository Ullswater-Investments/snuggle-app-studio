import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FileText, Eye, EyeOff, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SignerData {
  fullName: string;
  position: string;
  organizationName: string;
  taxId: string;
}

interface PDFPreviewProps {
  signerData: SignerData;
  onDownloadPreview?: () => void;
  isGenerating?: boolean;
  className?: string;
}

export const PDFPreview = ({
  signerData,
  onDownloadPreview,
  isGenerating = false,
  className
}: PDFPreviewProps) => {
  const { t, i18n } = useTranslation('contract');
  const [isExpanded, setIsExpanded] = useState(true);
  
  const currentDate = new Date().toLocaleDateString(i18n.language === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("border rounded-lg overflow-hidden bg-background", className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="font-medium">
            {t('preview.title', 'Vista previa del documento')}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {onDownloadPreview && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDownloadPreview}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Document Preview */}
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="p-6 bg-white text-gray-900 max-h-96 overflow-y-auto"
          style={{ fontFamily: 'Times New Roman, serif' }}
        >
          {/* Document Header */}
          <div className="text-center mb-6 pb-4 border-b-2 border-gray-300">
            <h1 className="text-xl font-bold uppercase tracking-wide mb-2">
              {t('preview.documentTitle', 'CARTA DE ADHESIÓN')}
            </h1>
            <h2 className="text-lg text-gray-600">
              {t('preview.documentSubtitle', 'ESPACIO DE DATOS PROCUREDATA')}
            </h2>
          </div>

          {/* Promoter Section */}
          <div className="mb-6">
            <h3 className="font-bold text-sm uppercase text-gray-500 mb-2">
              {t('preview.promoterSection', 'IDENTIFICACIÓN DEL PROMOTOR')}
            </h3>
            <p className="text-sm leading-relaxed">
              <strong>ACCURO TECHNOLOGY S.L.</strong>, con CIF <strong>B87617981</strong>, 
              en calidad de promotor y administrador del Espacio de Datos denominado 
              &quot;PROCUREDATA&quot; (en adelante, &quot;el Promotor&quot;).
            </p>
          </div>

          {/* Participant Section */}
          <div className="mb-6">
            <h3 className="font-bold text-sm uppercase text-gray-500 mb-2">
              {t('preview.participantSection', 'IDENTIFICACIÓN DEL PARTICIPANTE')}
            </h3>
            <div className="bg-gray-50 p-4 rounded border">
              <p className="text-sm leading-relaxed">
                <strong>{signerData.organizationName || '[Nombre de la Organización]'}</strong>, 
                con CIF/NIF <strong>{signerData.taxId || '[CIF/NIF]'}</strong>, 
                representada por <strong>{signerData.fullName || '[Nombre del Representante]'}</strong>, 
                en calidad de <strong>{signerData.position || '[Cargo]'}</strong> 
                (en adelante, &quot;el Participante&quot;).
              </p>
            </div>
          </div>

          {/* Object Section */}
          <div className="mb-6">
            <h3 className="font-bold text-sm uppercase text-gray-500 mb-2">
              {t('preview.objectSection', 'OBJETO DE LA CARTA')}
            </h3>
            <p className="text-sm leading-relaxed">
              Mediante la presente Carta de Adhesión, el Participante solicita formalmente 
              su incorporación al Espacio de Datos PROCUREDATA, declarando conocer y aceptar 
              íntegramente el marco normativo y las condiciones de participación establecidas.
            </p>
          </div>

          {/* Regulatory Acceptance */}
          <div className="mb-6">
            <h3 className="font-bold text-sm uppercase text-gray-500 mb-2">
              {t('preview.regulatorySection', 'ACEPTACIÓN NORMATIVA')}
            </h3>
            <p className="text-sm leading-relaxed mb-2">
              El Participante declara conocer y aceptar expresamente:
            </p>
            <ul className="text-sm list-disc list-inside space-y-1 ml-4">
              <li>Reglamento (UE) 2016/679 (RGPD)</li>
              <li>Reglamento (UE) 2022/868 (Data Governance Act)</li>
              <li>Reglamento (UE) 2023/2854 (Data Act)</li>
              <li>Reglamento (UE) 910/2014 (eIDAS)</li>
              <li>Ley Orgánica 3/2018 (LOPDGDD)</li>
              <li>Las Normas de Gobernanza del Espacio de Datos</li>
              <li>El Marco de Políticas ODRL</li>
            </ul>
          </div>

          {/* Signature Section */}
          <div className="mt-8 pt-4 border-t-2 border-gray-300">
            <p className="text-sm text-gray-600 mb-4">
              En prueba de conformidad, se firma electrónicamente la presente Carta de Adhesión.
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p><strong>{t('preview.signatureDate', 'Fecha')}:</strong> {currentDate}</p>
                <p><strong>{t('preview.signaturePlace', 'Lugar')}:</strong> Madrid, España</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 italic">
                  {t('preview.signaturePlaceholder', '[Firma electrónica]')}
                </p>
                <p className="mt-2">{signerData.fullName || '___________________'}</p>
                <p className="text-xs text-gray-500">{signerData.position || 'Representante Legal'}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
