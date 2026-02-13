import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import ContractContent from "@/components/legal/ContractContent";
import AcceptanceActContent from "@/components/legal/AcceptanceActContent";

const SUPER_ADMIN_EMAIL = 'emilio.emulet@accuro.es';

const PROVINCES = [
  'Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres',
  'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','A Coruña','Cuenca','Gerona','Granada','Guadalajara',
  'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga',
  'Murcia','Navarra','Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','S.C. Tenerife',
  'Segovia','Sevilla','Soria','Tarragona','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza','Ceuta','Melilla',
];

const CONTACT_ROLES = [
  { value: 'director', label: 'Director/a' },
  { value: 'gerente', label: 'Gerente' },
  { value: 'responsable', label: 'Responsable de Compras' },
  { value: 'otro', label: 'Otro' },
];

const MODULES = [
  { id: 'federated', label: 'Espacio de Datos Federado' },
  { id: 'dpp', label: 'Pasaporte Digital de Producto (DPP)' },
  { id: 'wallet', label: 'Wallet Digital' },
  { id: 'traceability', label: 'Trazabilidad Supply Chain' },
  { id: 'procurement', label: 'Abastecimiento Inteligente' },
  { id: 'kpi', label: 'Dashboard KPIs' },
];

const formSchema = z.object({
  clinic_name: z.string().min(2, "Mínimo 2 caracteres").max(200),
  cif: z.string().regex(/^[A-Z][0-9]{8}$|^[0-9]{8}[A-Z]$/, "Formato CIF/NIF inválido"),
  address: z.string().min(5, "Mínimo 5 caracteres").max(300),
  postal_code: z.string().regex(/^[0-9]{5}$/, "Código postal: 5 dígitos"),
  city: z.string().min(2).max(100),
  province: z.string().min(1, "Selecciona una provincia"),
  phone: z.string().regex(/^[0-9+\s]{9,15}$/, "Teléfono inválido"),
  email: z.string().email("Email inválido").max(255),
  contact_name: z.string().min(2).max(150),
  contact_role: z.string().min(1, "Selecciona un cargo"),
  contact_phone: z.string().regex(/^[0-9+\s]{9,15}$/, "Teléfono inválido"),
  contact_email: z.string().email("Email inválido").max(255),
  num_veterinarians: z.number().min(1).max(100).optional().nullable(),
  num_employees: z.number().min(1).max(500).optional().nullable(),
  current_software: z.string().max(200).optional(),
  has_website: z.boolean().optional(),
  has_digital_records: z.enum(['si', 'no', 'parcialmente']).optional(),
  interested_modules: z.array(z.string()).optional(),
  contract_accepted: z.boolean().refine(v => v === true, "Debes aceptar el contrato"),
  acceptance_act_accepted: z.boolean().refine(v => v === true, "Debes aceptar el acta"),
  privacy_accepted: z.boolean().refine(v => v === true, "Debes aceptar la política de privacidad"),
  communications_accepted: z.boolean().optional(),
  terms_accepted: z.boolean().refine(v => v === true, "Debes aceptar las condiciones"),
});

type FormData = z.infer<typeof formSchema>;

export default function KitEspacioDatosInscripcion() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { user } = useAuth();

  const isSuperAdmin = user?.email === SUPER_ADMIN_EMAIL;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clinic_name: '', cif: '', address: '', postal_code: '', city: '', province: '',
      phone: '', email: '', contact_name: '', contact_role: '', contact_phone: '', contact_email: '',
      num_veterinarians: null, num_employees: null, current_software: '',
      has_website: false, has_digital_records: undefined, interested_modules: [],
      contract_accepted: false, acceptance_act_accepted: false,
      privacy_accepted: false, communications_accepted: false, terms_accepted: false,
    },
  });

  const nextStep = async () => {
    if (isSuperAdmin) {
      setStep(step + 1);
      return;
    }
    const fieldsToValidate: (keyof FormData)[] = step === 1
      ? ['clinic_name', 'cif', 'phone', 'email', 'address', 'postal_code', 'city', 'province']
      : ['contact_name', 'contact_role', 'contact_phone', 'contact_email'];
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) setStep(step + 1);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { data: result, error } = await supabase.from('kit_inscriptions' as any).insert({
        clinic_name: data.clinic_name,
        cif: data.cif,
        address: data.address,
        postal_code: data.postal_code,
        city: data.city,
        province: data.province,
        phone: data.phone,
        email: data.email,
        contact_name: data.contact_name,
        contact_role: data.contact_role,
        contact_phone: data.contact_phone,
        contact_email: data.contact_email,
        num_veterinarians: data.num_veterinarians,
        num_employees: data.num_employees,
        current_software: data.current_software,
        has_website: data.has_website,
        has_digital_records: data.has_digital_records,
        interested_modules: data.interested_modules,
        contract_accepted: data.contract_accepted,
        acceptance_act_accepted: data.acceptance_act_accepted,
        contract_accepted_at: new Date().toISOString(),
        privacy_accepted: data.privacy_accepted,
        terms_accepted: data.terms_accepted,
        communications_accepted: data.communications_accepted,
        utm_source: searchParams.get('utm_source'),
        utm_medium: searchParams.get('utm_medium'),
        utm_campaign: searchParams.get('utm_campaign'),
      } as any).select('id').single();

      if (error) throw error;

      const refId = (result as any).id.slice(0, 8).toUpperCase();
      setReferenceId(refId);

      // Non-blocking email notification
      supabase.functions.invoke('send-inscription-email', {
        body: {
          clinicName: data.clinic_name,
          cif: data.cif,
          email: data.email,
          contactName: data.contact_name,
          contactEmail: data.contact_email,
          contactPhone: data.contact_phone,
          referenceId: refId,
        },
      }).catch((err) => console.error('Email notification error:', err));

      setStep(4); // success
    } catch (err: any) {
      toast({ title: 'Error', description: err.message || 'Error al enviar la solicitud', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success screen
  if (step === 4 && referenceId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-lg w-full">
          <CardContent className="p-8 text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto" />
            <h2 className="text-2xl font-bold">¡Solicitud Enviada con Éxito!</h2>
            <p className="text-muted-foreground">Tu referencia:</p>
            <div className="text-3xl font-mono font-bold text-primary">{referenceId}</div>
            <p className="text-sm text-muted-foreground">Nos pondremos en contacto en 48 horas.</p>
            <div className="flex flex-col gap-2 pt-4">
              <Button asChild><Link to="/condiciones-kit-espacio-datos">Ver Detalles de las Ayudas</Link></Button>
              <Button asChild variant="outline"><Link to="/">Volver al Inicio</Link></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/condiciones-kit-espacio-datos" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Volver a Condiciones
          </Link>
          <span className="text-sm text-muted-foreground">Paso {step} de 3</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Progress value={(step / 3) * 100} className="h-2 mb-8" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Datos de la Empresa</h2>
                <FormField control={form.control} name="clinic_name" render={({ field }) => (
                  <FormItem><FormLabel>Nombre de la empresa *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="cif" render={({ field }) => (
                  <FormItem><FormLabel>CIF/NIF *</FormLabel><FormControl><Input {...field} onChange={e => field.onChange(e.target.value.toUpperCase())} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>Teléfono *</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email *</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem><FormLabel>Dirección *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-3 gap-4">
                  <FormField control={form.control} name="postal_code" render={({ field }) => (
                    <FormItem><FormLabel>C.P. *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem><FormLabel>Ciudad *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="province" render={({ field }) => (
                    <FormItem><FormLabel>Provincia *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger></FormControl>
                        <SelectContent>{PROVINCES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                      </Select><FormMessage />
                    </FormItem>
                  )} />
                </div>
                <Button type="button" onClick={nextStep} className="w-full" disabled={!isSuperAdmin && false}>
                  Siguiente <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Datos del Responsable</h2>
                <FormField control={form.control} name="contact_name" render={({ field }) => (
                  <FormItem><FormLabel>Nombre completo *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="contact_role" render={({ field }) => (
                  <FormItem><FormLabel>Cargo *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Seleccionar cargo" /></SelectTrigger></FormControl>
                      <SelectContent>{CONTACT_ROLES.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}</SelectContent>
                    </Select><FormMessage />
                  </FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="contact_phone" render={({ field }) => (
                    <FormItem><FormLabel>Teléfono *</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="contact_email" render={({ field }) => (
                    <FormItem><FormLabel>Email *</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
                  </Button>
                  <Button type="button" onClick={nextStep} className="flex-1">
                    Siguiente <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold">Confirmación</h2>

                {/* Optional info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-muted-foreground">Información adicional (opcional)</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="num_veterinarians" render={({ field }) => (
                      <FormItem><FormLabel>Nº profesionales</FormLabel><FormControl><Input type="number" onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)} value={field.value ?? ''} /></FormControl></FormItem>
                    )} />
                    <FormField control={form.control} name="num_employees" render={({ field }) => (
                      <FormItem><FormLabel>Nº empleados</FormLabel><FormControl><Input type="number" onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)} value={field.value ?? ''} /></FormControl></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="current_software" render={({ field }) => (
                    <FormItem><FormLabel>Software actual</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                  )} />
                </div>

                {/* Modules */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-muted-foreground">Módulos de interés</h3>
                  <FormField control={form.control} name="interested_modules" render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-2 gap-2">
                        {MODULES.map(m => (
                          <label key={m.id} className="flex items-center gap-2 text-sm cursor-pointer">
                            <Checkbox
                              checked={field.value?.includes(m.id)}
                              onCheckedChange={(checked) => {
                                const current = field.value || [];
                                field.onChange(checked ? [...current, m.id] : current.filter(v => v !== m.id));
                              }}
                            />
                            {m.label}
                          </label>
                        ))}
                      </div>
                    </FormItem>
                  )} />
                </div>

                {/* Contract */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Contrato de Adhesión</h3>
                  <ContractContent clinicName={form.watch('clinic_name') || undefined} />
                  <FormField control={form.control} name="contract_accepted" render={({ field }) => (
                    <FormItem className="flex items-start gap-3">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <FormLabel className="text-sm font-normal">He leído y acepto el <strong>CONTRATO DE ADHESIÓN</strong> *</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                {/* Acceptance Act */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Acta de Entrega y Conformidad</h3>
                  <AcceptanceActContent
                    clinicName={form.watch('clinic_name') || undefined}
                    contactName={form.watch('contact_name') || undefined}
                  />
                  <FormField control={form.control} name="acceptance_act_accepted" render={({ field }) => (
                    <FormItem className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/20 p-3 rounded">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <FormLabel className="text-sm font-normal">Acepto el <strong>ACTA DE ENTREGA Y CONFORMIDAD</strong> *</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                {/* Consents */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-muted-foreground">Consentimientos</h3>
                  <FormField control={form.control} name="privacy_accepted" render={({ field }) => (
                    <FormItem className="flex items-start gap-3">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <FormLabel className="text-sm font-normal">Acepto la <Link to="/legal" className="text-primary underline">política de privacidad</Link> *</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="terms_accepted" render={({ field }) => (
                    <FormItem className="flex items-start gap-3">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <FormLabel className="text-sm font-normal">Acepto las <Link to="/condiciones-kit-espacio-datos" className="text-primary underline">condiciones de participación</Link> *</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="communications_accepted" render={({ field }) => (
                    <FormItem className="flex items-start gap-3">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <FormLabel className="text-sm font-normal">Acepto recibir comunicaciones comerciales</FormLabel>
                    </FormItem>
                  )} />
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
