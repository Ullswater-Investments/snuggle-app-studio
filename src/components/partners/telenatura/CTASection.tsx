import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

export const CTASection = () => {
  const { t } = useTranslation('telenatura');

  return (
    <section className="py-20 bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-lg text-green-100 mb-8">
            {t('cta.description')}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              className="bg-white text-green-900 hover:bg-green-100"
              asChild
            >
              <a href="https://www.telenatura.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                {t('cta.buttons.visitWeb')}
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <a href="mailto:info@telenatura.com">
                <Mail className="w-4 h-4 mr-2" />
                {t('cta.buttons.contact')}
              </a>
            </Button>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-4 text-center">
                <Mail className="w-6 h-6 mx-auto mb-2 text-green-300" />
                <p className="text-sm text-green-200">{t('cta.contact.email')}</p>
                <p className="font-medium">info@telenatura.com</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-4 text-center">
                <Phone className="w-6 h-6 mx-auto mb-2 text-green-300" />
                <p className="text-sm text-green-200">{t('cta.contact.phone')}</p>
                <p className="font-medium">+34 XXX XXX XXX</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-4 text-center">
                <MapPin className="w-6 h-6 mx-auto mb-2 text-green-300" />
                <p className="text-sm text-green-200">{t('cta.contact.location')}</p>
                <p className="font-medium">{t('cta.contact.country')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
