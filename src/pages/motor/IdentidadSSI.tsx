import { Link } from "react-router-dom";
import { Fingerprint, Shield, Zap, CheckCircle, BadgeCheck, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";
import { FundingFooter } from "@/components/FundingFooter";
import { useTranslation } from "react-i18next";

export default function IdentidadSSI() {
  const { t } = useTranslation('motor');

  const verifiedAttributes = [
    { label: t('ssi.attributes.cif'), issuer: t('ssi.issuers.taxAgency'), date: "2025-01-15" },
    { label: t('ssi.attributes.iso9001'), issuer: "AENOR", date: "2024-08-20" },
    { label: t('ssi.attributes.iso14001'), issuer: "Bureau Veritas", date: "2024-11-01" },
    { label: t('ssi.attributes.ptic'), issuer: t('ssi.issuers.cluster'), date: "2025-01-01" }
  ];

  const specs = [
    { label: t('ssi.specs.protocol.label'), value: t('ssi.specs.protocol.value') },
    { label: t('ssi.specs.standard.label'), value: t('ssi.specs.standard.value') },
    { label: t('ssi.specs.persistence.label'), value: t('ssi.specs.persistence.value') }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <ProcuredataLogo size="md" showNavigation={true} />
          <Badge variant="outline" className="border-purple-500 text-purple-400">{t('ssi.badge')}</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 mb-6">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Fingerprint className="h-12 w-12 text-purple-400" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('ssi.title')}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('ssi.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Interface Simulation - Digital Passport */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-muted dark:from-slate-900 to-purple-900/30 border-purple-500/30 overflow-hidden">
              <CardHeader className="border-b border-border dark:border-white/10 bg-muted/50 dark:bg-white/5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Globe className="h-5 w-5 text-purple-400" />
                    {t('ssi.passport')}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* DID Display */}
                <div className="bg-muted dark:bg-black/40 rounded-xl p-6 border border-purple-500/20">
                  <p className="text-xs text-muted-foreground mb-2">{t('ssi.did')}</p>
                  <p className="font-mono text-purple-400 text-sm break-all">
                    did:ethr:0x7ecc4a3b9f2d1e8c...4b2a
                  </p>
                </div>

                {/* Verified Attributes */}
                <div>
                  <p className="text-sm text-muted-foreground mb-4">{t('ssi.verifiedAttributes')}</p>
                  <div className="space-y-3">
                    {verifiedAttributes.map((attr, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted dark:bg-white/5 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-3">
                          <BadgeCheck className="h-5 w-5 text-green-400" />
                          <div>
                            <p className="text-sm text-foreground font-medium">{attr.label}</p>
                            <p className="text-xs text-muted-foreground">{t('ssi.issuedBy')} {attr.issuer}</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          {t('ssi.valid')}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex gap-3">
                  <div className="flex-1 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 text-center">
                    <Globe className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                    <p className="text-xs text-blue-400">{t('ssi.gaiaXVerified')}</p>
                  </div>
                  <div className="flex-1 p-4 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
                    <Shield className="h-6 w-6 text-green-400 mx-auto mb-2" />
                    <p className="text-xs text-green-400">{t('ssi.kybPassed')}</p>
                  </div>
                  <div className="flex-1 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 text-center">
                    <Fingerprint className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                    <p className="text-xs text-purple-400">{t('ssi.ssiActive')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">{t('ssi.didTitle')}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t('ssi.description1')}
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4" dangerouslySetInnerHTML={{ __html: t('ssi.description2') }} />
            </div>

            {/* Technical Specs */}
            <Card className="bg-gradient-to-br from-purple-900/20 to-muted dark:to-slate-900 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-foreground text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-400" />
                  {t('common.technicalSpecs')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {specs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{spec.label}</p>
                      <p className="text-sm text-muted-foreground">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Business Benefit */}
            <Card className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-orange-500/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-500/20 rounded-lg">
                    <Zap className="h-6 w-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">{t('ssi.businessBenefit.title')}</h3>
                    <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('ssi.businessBenefit.description') }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="flex gap-4">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/auth">{t('common.tryDemo')}</Link>
              </Button>
              <Button asChild className="flex-1 bg-primary hover:bg-primary/90">
                <Link to="/architecture">{t('common.viewArchitecture')}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <FundingFooter variant="light" showTransparency={false} />
    </div>
  );
}
