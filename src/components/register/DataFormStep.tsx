import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Building2, User, Target, Package, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { SupplierObligationsPreview } from './SupplierObligationsPreview';

export interface RegistrationFormData {
  organization: {
    legalName: string;
    taxId: string;
    country: string;
    address: string;
    sector: string;
    size: string;
    productCategory?: string;
    erpType?: string;
  };
  representative: {
    fullName: string;
    position: string;
    email: string;
    phone: string;
  };
  intention: {
    role: string;
    dataTypes: string[];
    hasErp: string;
  };
}

interface DataFormStepProps {
  formData: RegistrationFormData;
  onFormChange: (data: RegistrationFormData) => void;
  errors: Record<string, string>;
  selectedRole?: 'buyer' | 'supplier' | null;
}

export const DataFormStep = ({ formData, onFormChange, errors, selectedRole }: DataFormStepProps) => {
  const { t } = useTranslation('register');

  const sectorsRaw = t('dataForm.sectors', { returnObjects: true });
  const sizesRaw = t('dataForm.sizes', { returnObjects: true });
  const countriesRaw = t('dataForm.countries', { returnObjects: true });
  const dataTypeOptionsRaw = t('dataForm.intention.fields.dataTypes.options', { returnObjects: true });
  const erpOptionsRaw = t('dataForm.intention.fields.hasErp.options', { returnObjects: true });

  const sectors = typeof sectorsRaw === 'object' ? sectorsRaw as Record<string, string> : {};
  const sizes = typeof sizesRaw === 'object' ? sizesRaw as Record<string, string> : {};
  const countries = typeof countriesRaw === 'object' ? countriesRaw as Record<string, string> : {};
  const dataTypeOptions = typeof dataTypeOptionsRaw === 'object' ? dataTypeOptionsRaw as Record<string, string> : {};
  const erpOptions = typeof erpOptionsRaw === 'object' ? erpOptionsRaw as Record<string, string> : {};

  // Product categories for suppliers
  const productCategories: Record<string, string> = {
    it: 'IT / Software',
    construction: 'Construcción',
    services: 'Servicios Profesionales',
    logistics: 'Logística y Transporte',
    manufacturing: 'Manufactura Industrial',
    food: 'Alimentación y Bebidas',
    energy: 'Energía y Utilities',
    healthcare: 'Sanidad y Farmacia',
    other: 'Otros',
  };

  // ERP types for buyers
  const erpTypes: Record<string, string> = {
    sap: 'SAP',
    oracle: 'Oracle',
    microsoft: 'Microsoft Dynamics',
    sage: 'Sage',
    odoo: 'Odoo',
    other: 'Otro',
    none: 'Sin ERP',
  };

  const updateOrganization = (field: string, value: string) => {
    onFormChange({
      ...formData,
      organization: { ...formData.organization, [field]: value },
    });
  };

  const updateRepresentative = (field: string, value: string) => {
    onFormChange({
      ...formData,
      representative: { ...formData.representative, [field]: value },
    });
  };

  const updateIntention = (field: string, value: string | string[]) => {
    onFormChange({
      ...formData,
      intention: { ...formData.intention, [field]: value },
    });
  };

  const toggleDataType = (type: string) => {
    const current = formData.intention.dataTypes;
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    updateIntention('dataTypes', updated);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const isBuyer = selectedRole === 'buyer';
  const isSupplier = selectedRole === 'supplier';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {t('dataForm.title')}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('dataForm.subtitle')}
        </p>
        {selectedRole && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
            {isBuyer ? <Building2 className="w-4 h-4" /> : <Package className="w-4 h-4" />}
            {isBuyer ? t('roleSelection.buyer.title') : t('roleSelection.supplier.title')}
          </div>
        )}
      </motion.div>

      {/* Organization Data */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building2 className="w-5 h-5 text-primary" />
              {t('dataForm.organization.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="legalName">
                {t('dataForm.organization.fields.legalName.label')} *
              </Label>
              <Input
                id="legalName"
                placeholder={t('dataForm.organization.fields.legalName.placeholder')}
                value={formData.organization.legalName}
                onChange={(e) => updateOrganization('legalName', e.target.value)}
                className={errors['organization.legalName'] ? 'border-destructive' : ''}
              />
              {errors['organization.legalName'] && (
                <p className="text-xs text-destructive">{errors['organization.legalName']}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxId" className="flex items-center gap-2">
                {t('dataForm.organization.fields.taxId.label')} *
                <InfoTooltip
                  tooltip={t('tooltips.taxId.short')}
                  modalTitle={t('tooltips.taxId.title')}
                  modalContent={t('tooltips.taxId.full')}
                />
              </Label>
              <Input
                id="taxId"
                placeholder={t('dataForm.organization.fields.taxId.placeholder')}
                value={formData.organization.taxId}
                onChange={(e) => updateOrganization('taxId', e.target.value)}
                className={errors['organization.taxId'] ? 'border-destructive' : ''}
              />
              {errors['organization.taxId'] && (
                <p className="text-xs text-destructive">{errors['organization.taxId']}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>{t('dataForm.organization.fields.country.label')} *</Label>
              <Select
                value={formData.organization.country}
                onValueChange={(value) => updateOrganization('country', value)}
              >
                <SelectTrigger className={errors['organization.country'] ? 'border-destructive' : ''}>
                  <SelectValue placeholder={t('dataForm.organization.fields.country.placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(countries).map(([code, name]) => (
                    <SelectItem key={code} value={code}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">
                {t('dataForm.organization.fields.address.label')} *
              </Label>
              <Input
                id="address"
                placeholder={t('dataForm.organization.fields.address.placeholder')}
                value={formData.organization.address}
                onChange={(e) => updateOrganization('address', e.target.value)}
                className={errors['organization.address'] ? 'border-destructive' : ''}
              />
            </div>

            <div className="space-y-2">
              <Label>{t('dataForm.organization.fields.sector.label')} *</Label>
              <Select
                value={formData.organization.sector}
                onValueChange={(value) => updateOrganization('sector', value)}
              >
                <SelectTrigger className={errors['organization.sector'] ? 'border-destructive' : ''}>
                  <SelectValue placeholder={t('dataForm.organization.fields.sector.placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(sectors).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t('dataForm.organization.fields.size.label')} *</Label>
              <Select
                value={formData.organization.size}
                onValueChange={(value) => updateOrganization('size', value)}
              >
                <SelectTrigger className={errors['organization.size'] ? 'border-destructive' : ''}>
                  <SelectValue placeholder={t('dataForm.organization.fields.size.placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(sizes).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Conditional: Product Category for Suppliers */}
            {isSupplier && (
              <div className="space-y-2 md:col-span-2">
                <Label className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  Categoría de Producto/Servicio *
                </Label>
                <Select
                  value={formData.organization.productCategory || ''}
                  onValueChange={(value) => updateOrganization('productCategory', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu categoría principal" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(productCategories).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Conditional: ERP Type for Buyers */}
            {isBuyer && (
              <div className="space-y-2 md:col-span-2">
                <Label className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-muted-foreground" />
                  Sistema ERP
                  <InfoTooltip
                    tooltip="Para configurar la integración técnica"
                    modalTitle="Integración con tu ERP"
                    modalContent="Conocer tu sistema ERP nos permite preconfigurar los conectores IDS adecuados para facilitar el intercambio de datos con el ecosistema ProcureData."
                  />
                </Label>
                <Select
                  value={formData.organization.erpType || ''}
                  onValueChange={(value) => updateOrganization('erpType', value)}
                >
                  <SelectTrigger className="md:w-1/2">
                    <SelectValue placeholder="Selecciona tu ERP" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(erpTypes).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Representative Data */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="w-5 h-5 text-primary" />
              {t('dataForm.representative.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">
                {t('dataForm.representative.fields.fullName.label')} *
              </Label>
              <Input
                id="fullName"
                placeholder={t('dataForm.representative.fields.fullName.placeholder')}
                value={formData.representative.fullName}
                onChange={(e) => updateRepresentative('fullName', e.target.value)}
                className={errors['representative.fullName'] ? 'border-destructive' : ''}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">
                {t('dataForm.representative.fields.position.label')} *
              </Label>
              <Input
                id="position"
                placeholder={t('dataForm.representative.fields.position.placeholder')}
                value={formData.representative.position}
                onChange={(e) => updateRepresentative('position', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                {t('dataForm.representative.fields.email.label')} *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t('dataForm.representative.fields.email.placeholder')}
                value={formData.representative.email}
                onChange={(e) => updateRepresentative('email', e.target.value)}
                className={errors['representative.email'] ? 'border-destructive' : ''}
              />
              {errors['representative.email'] && (
                <p className="text-xs text-destructive">{errors['representative.email']}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                {t('dataForm.representative.fields.phone.label')}
              </Label>
              <Input
                id="phone"
                placeholder={t('dataForm.representative.fields.phone.placeholder')}
                value={formData.representative.phone}
                onChange={(e) => updateRepresentative('phone', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Intention - Only show if not already determined by role */}
      {!selectedRole && (
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="w-5 h-5 text-primary" />
                {t('dataForm.intention.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Role */}
              <div className="space-y-3">
                <Label>{t('dataForm.intention.fields.role.label')} *</Label>
                <RadioGroup
                  value={formData.intention.role}
                  onValueChange={(value) => updateIntention('role', value)}
                  className="grid grid-cols-1 md:grid-cols-3 gap-3"
                >
                  {(['provider', 'consumer', 'both'] as const).map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <RadioGroupItem value={role} id={role} />
                      <Label htmlFor={role} className="cursor-pointer text-sm">
                        {t(`dataForm.intention.fields.role.options.${role}`)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Data Types */}
              <div className="space-y-3">
                <Label>{t('dataForm.intention.fields.dataTypes.label')}</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(dataTypeOptions).map(([key, label]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`dataType-${key}`}
                        checked={formData.intention.dataTypes.includes(key)}
                        onCheckedChange={() => toggleDataType(key)}
                      />
                      <Label htmlFor={`dataType-${key}`} className="cursor-pointer text-sm">
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* ERP */}
              <div className="space-y-3">
                <Label>{t('dataForm.intention.fields.hasErp.label')}</Label>
                <Select
                  value={formData.intention.hasErp}
                  onValueChange={(value) => updateIntention('hasErp', value)}
                >
                  <SelectTrigger className="w-full md:w-1/2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(erpOptions).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Supplier Obligations Preview */}
      {isSupplier && (
        <motion.div variants={itemVariants}>
          <SupplierObligationsPreview />
        </motion.div>
      )}

      {/* Buyer KYB Info */}
      {isBuyer && (
        <motion.div variants={itemVariants}>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">
                    Verificación KYB Requerida
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Como comprador, necesitarás completar una verificación de identidad corporativa 
                    (Know Your Business) para acceder a datos sensibles de proveedores. 
                    Te guiaremos en el proceso tras el registro.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};
