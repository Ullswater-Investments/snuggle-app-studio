import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Factory,
  Building2,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Send,
  Lock,
} from "lucide-react";
import { toast } from "sonner";

// Schema de validación Zod
const adhesionSchema = z.object({
  companyName: z.string().min(3, "Nombre requerido (mínimo 3 caracteres)"),
  organizationType: z.string().min(1, "Selecciona un tipo de organización"),
  plantCount: z.string().min(1, "Indica el número de plantas"),
  email: z.string().email("Formato de email no válido"),
  phone: z.string().optional(),
  message: z.string().optional(),
  acceptPrivacy: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar la política de privacidad" }),
  }),
});

type AdhesionFormData = z.infer<typeof adhesionSchema>;

interface FormErrors {
  companyName?: string;
  organizationType?: string;
  plantCount?: string;
  email?: string;
  phone?: string;
  message?: string;
  acceptPrivacy?: string;
}

const organizationTypes = [
  { value: "fabrica_cemento", label: "Fábrica de cemento" },
  { value: "planta_hormigon", label: "Planta de hormigón" },
  { value: "gestor_residuos", label: "Gestor de residuos / Valorizador" },
  { value: "proveedor_materias", label: "Proveedor de materias primas" },
  { value: "centro_tecnologico", label: "Centro tecnológico / I+D" },
  { value: "otra", label: "Otra empresa del sector" },
];

const plantCounts = [
  { value: "1", label: "1 planta" },
  { value: "2-5", label: "2-5 plantas" },
  { value: "6-10", label: "6-10 plantas" },
  { value: "10+", label: "Más de 10 plantas" },
];

export const AraceaAdhesionForm = () => {
  const [formData, setFormData] = useState<Partial<AdhesionFormData>>({
    companyName: "",
    organizationType: "",
    plantCount: "",
    email: "",
    phone: "",
    message: "",
    acceptPrivacy: false as unknown as true,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const result = adhesionSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormErrors;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Por favor, corrige los errores del formulario");
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar datos extra para el campo notes
      const extraData = {
        phone: formData.phone || null,
        plantCount: formData.plantCount,
        source: "aracea",
      };

      const { data, error } = await supabase.functions.invoke(
        "submit-node-eligibility",
        {
          body: {
            entityName: formData.companyName,
            entityType: formData.organizationType,
            ecosystemStatus: "aracea_participant",
            email: formData.email,
            source: "aracea",
            extraData: extraData,
          },
        }
      );

      if (error) {
        throw new Error(error.message || "Error al enviar la solicitud");
      }

      if (data?.success) {
        setIsSuccess(true);
        setRequestId(data.requestId);
        toast.success("¡Solicitud enviada correctamente!");
      } else {
        throw new Error(data?.message || "Error desconocido");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error(
        err instanceof Error ? err.message : "Error al enviar la solicitud"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof AdhesionFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpiar error del campo al modificarlo
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Estado de éxito
  if (isSuccess) {
    return (
      <section className="py-20 md:py-24 px-6 bg-slate-900" id="adhesion-form">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-green-900/50 to-green-800/30 border-2 border-green-500/50 rounded-2xl p-8 sm:p-12 text-center"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              ¡Solicitud Recibida!
            </h3>
            <p className="text-lg text-green-100 mb-6">
              Gracias por tu interés en el Nodo ARACEA/OFICEMEN. Nuestro equipo
              te contactará en las próximas <strong>24-48 horas</strong> para
              explicarte los siguientes pasos.
            </p>
            {requestId && (
              <p className="text-sm text-green-300/80 bg-green-900/50 px-4 py-2 rounded-lg inline-block">
                <strong>Referencia:</strong> {requestId.slice(0, 8).toUpperCase()}
              </p>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-24 px-6 bg-slate-900" id="adhesion-form">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/50 rounded-full px-4 py-1.5 text-orange-300 text-sm font-semibold mb-6">
            <ShieldCheck className="h-4 w-4" />
            Financiación 100% garantizada por SEDIA
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Solicita Adhesión al Nodo
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Completa el formulario y nuestro equipo te contactará en 24 horas
            para iniciar el proceso de adhesión al ecosistema de datos del
            sector cemento.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-slate-800/50 border-2 border-orange-500/30 rounded-2xl p-6 sm:p-10"
        >
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-700">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Factory className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Formulario de Adhesión ARACEA
              </h3>
              <p className="text-sm text-slate-400">
                Sector Cemento y Hormigón
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Nombre de empresa */}
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-slate-200">
                  Nombre de la empresa <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="companyName"
                  placeholder="Ej: Cementos del Norte S.A."
                  value={formData.companyName}
                  onChange={(e) =>
                    handleInputChange("companyName", e.target.value)
                  }
                  className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500 ${
                    errors.companyName ? "border-red-500" : ""
                  }`}
                  disabled={isSubmitting}
                />
                {errors.companyName && (
                  <p className="text-sm text-red-400">{errors.companyName}</p>
                )}
              </div>

              {/* Tipo de organización */}
              <div className="space-y-2">
                <Label htmlFor="organizationType" className="text-slate-200">
                  Tipo de organización <span className="text-red-400">*</span>
                </Label>
                <Select
                  value={formData.organizationType}
                  onValueChange={(value) =>
                    handleInputChange("organizationType", value)
                  }
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    className={`bg-slate-700/50 border-slate-600 text-white focus:border-orange-500 ${
                      errors.organizationType ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {organizationTypes.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="text-white hover:bg-slate-700 focus:bg-slate-700"
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.organizationType && (
                  <p className="text-sm text-red-400">
                    {errors.organizationType}
                  </p>
                )}
              </div>

              {/* Número de plantas */}
              <div className="space-y-2">
                <Label htmlFor="plantCount" className="text-slate-200">
                  Número de plantas/instalaciones{" "}
                  <span className="text-red-400">*</span>
                </Label>
                <Select
                  value={formData.plantCount}
                  onValueChange={(value) =>
                    handleInputChange("plantCount", value)
                  }
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    className={`bg-slate-700/50 border-slate-600 text-white focus:border-orange-500 ${
                      errors.plantCount ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="¿Cuántas conectarías?" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {plantCounts.map((count) => (
                      <SelectItem
                        key={count.value}
                        value={count.value}
                        className="text-white hover:bg-slate-700 focus:bg-slate-700"
                      >
                        {count.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.plantCount && (
                  <p className="text-sm text-red-400">{errors.plantCount}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">
                  Email corporativo <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contacto@tuempresa.es"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-red-400">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Teléfono */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-200">
                Teléfono de contacto{" "}
                <span className="text-slate-500">(opcional)</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+34 600 000 000"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500"
                disabled={isSubmitting}
              />
            </div>

            {/* Mensaje */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-slate-200">
                Mensaje o comentarios{" "}
                <span className="text-slate-500">(opcional)</span>
              </Label>
              <Textarea
                id="message"
                placeholder="Cuéntanos sobre tu interés en el Espacio de Datos o cualquier pregunta que tengas..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500 min-h-[100px]"
                disabled={isSubmitting}
              />
            </div>

            {/* Checkbox privacidad */}
            <div className="flex items-start gap-3 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <Checkbox
                id="acceptPrivacy"
                checked={formData.acceptPrivacy as boolean}
                onCheckedChange={(checked) =>
                  handleInputChange("acceptPrivacy", checked as boolean)
                }
                className="mt-1 border-slate-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                disabled={isSubmitting}
              />
              <div className="flex-1">
                <Label
                  htmlFor="acceptPrivacy"
                  className={`text-sm leading-relaxed cursor-pointer ${
                    errors.acceptPrivacy ? "text-red-300" : "text-slate-300"
                  }`}
                >
                  <Lock className="inline h-3 w-3 mr-1 mb-0.5" />
                  Acepto la{" "}
                  <a
                    href="/politica-privacidad"
                    target="_blank"
                    className="text-orange-400 hover:underline"
                  >
                    política de privacidad
                  </a>{" "}
                  y consiento el tratamiento de mis datos para gestionar mi
                  solicitud de adhesión al Nodo ARACEA conforme al RGPD.
                </Label>
                {errors.acceptPrivacy && (
                  <p className="text-sm text-red-400 mt-1">
                    {errors.acceptPrivacy}
                  </p>
                )}
              </div>
            </div>

            {/* Botón submit */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 rounded-xl font-bold text-lg shadow-lg shadow-orange-900/30 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Enviando solicitud...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Solicitud de Adhesión
                </>
              )}
            </Button>

            <p className="text-center text-sm text-slate-500">
              <Building2 className="inline h-4 w-4 mr-1 mb-0.5" />
              Respuesta garantizada en menos de 24 horas laborables
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default AraceaAdhesionForm;
