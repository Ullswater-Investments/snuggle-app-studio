import { Link } from "react-router-dom";
import { FileCode, Shield, Zap, CheckCircle, ToggleRight, Lock, Users, Building } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { MotorNavigation } from "@/components/MotorNavigation";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";
import { FundingFooter } from "@/components/FundingFooter";
import { useTranslation } from "react-i18next";

export default function GobernanzaODRL() {
  const { t } = useTranslation('motor');
  const [permissions, setPermissions] = useState({
    read: true,
    analyze: true,
    download: false,
    redistribute: false,
    expiry30: true
  });

  const kpis = [
    { icon: Lock, value: "100%", label: t('odrl.kpis.control'), color: "text-green-500" },
    { icon: Zap, value: "<1s", label: t('odrl.kpis.revocation'), color: "text-blue-500" },
    { icon: Shield, value: "W3C", label: t('odrl.kpis.standard'), color: "text-purple-500" },
  ];

  const benefits = [
    { 
      role: t('odrl.benefits.provider.role'), 
      icon: Building, 
      items: [
        t('odrl.benefits.provider.items.control'),
        t('odrl.benefits.provider.items.revocation'),
        t('odrl.benefits.provider.items.audit')
      ] 
    },
    { 
      role: t('odrl.benefits.consumer.role'), 
      icon: Users, 
      items: [
        t('odrl.benefits.consumer.items.clarity'),
        t('odrl.benefits.consumer.items.compliance'),
        t('odrl.benefits.consumer.items.contracts')
      ] 
    },
  ];

  const policyOptions = [
    { key: 'read', label: t('odrl.policies.read.label'), desc: t('odrl.policies.read.desc') },
    { key: 'analyze', label: t('odrl.policies.analyze.label'), desc: t('odrl.policies.analyze.desc') },
    { key: 'download', label: t('odrl.policies.download.label'), desc: t('odrl.policies.download.desc') },
    { key: 'redistribute', label: t('odrl.policies.redistribute.label'), desc: t('odrl.policies.redistribute.desc') },
    { key: 'expiry30', label: t('odrl.policies.expiry.label'), desc: t('odrl.policies.expiry.desc') }
  ];

  const specs = [
    { label: t('odrl.specs.grammar.label'), value: t('odrl.specs.grammar.value') },
    { label: t('odrl.specs.components.label'), value: t('odrl.specs.components.value') },
    { label: t('odrl.specs.context.label'), value: t('odrl.specs.context.value') }
  ];

  const generateODRL = () => {
    const perms = [];
    if (permissions.read) perms.push('"read"');
    if (permissions.analyze) perms.push('"analyze"');
    if (permissions.download) perms.push('"download"');
    
    return `{
  "@context": "http://www.w3.org/ns/odrl.jsonld",
  "@type": "Offer",
  "permission": [{
    "target": "Passport_Supplier_A",
    "action": [${perms.join(', ')}],
    "constraint": [{
      "leftOperand": "dateTime",
      "operator": "lt",
      "rightOperand": "${permissions.expiry30 ? '2026-02-07' : '2027-01-07'}"
    }]
  }],
  "prohibition": [{
    "action": "${permissions.redistribute ? '' : 'redistribute'}"
  }]
}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <ProcuredataLogo size="md" showNavigation={true} />
          <Badge variant="outline" className="border-blue-500 text-blue-600">{t('odrl.badge')}</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero con KPIs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-500/15 border border-blue-500/30 mb-6">
            <FileCode className="h-10 w-10 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('odrl.title')}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('odrl.subtitle')}
          </p>
          <MotorNavigation currentPath="/motor/gobernanza-odrl" />
          
          {/* KPIs */}
          <div className="flex justify-center gap-6 flex-wrap">
            {kpis.map((kpi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-xl"
              >
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                <div className="text-left">
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground">{kpi.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sección: Por qué importa */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg shrink-0">
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">{t('common.whyItMatters')}</h2>
                  <p className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: t('odrl.whyDescription') }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Constructor de Políticas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <Card className="bg-card border-border">
              <CardHeader className="border-b border-border bg-muted/50">
                <CardTitle className="flex items-center gap-2">
                  <ToggleRight className="h-5 w-5 text-blue-500" />
                  {t('odrl.policyBuilder')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {policyOptions.map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch 
                      checked={permissions[item.key as keyof typeof permissions]}
                      onCheckedChange={(checked) => setPermissions(prev => ({ ...prev, [item.key]: checked }))}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Código ODRL Generado */}
            <Card className="bg-muted border-blue-500/30">
              <CardHeader className="border-b border-border bg-blue-500/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-mono">{t('odrl.generatedPolicy')}</CardTitle>
                  <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30 text-xs">JSON-LD</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <pre className="text-xs text-blue-500 font-mono overflow-x-auto whitespace-pre">
                  {generateODRL()}
                </pre>
              </CardContent>
            </Card>
          </motion.div>

          {/* Beneficios y Especificaciones */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Beneficios por Rol */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">{t('odrl.benefitsByRole')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {benefits.map((benefit, i) => (
                  <div key={i} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <benefit.icon className="h-5 w-5 text-primary" />
                      <p className="font-medium">{benefit.role}</p>
                    </div>
                    <ul className="space-y-2">
                      {benefit.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Especificaciones */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  {t('common.technicalSpecs')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {specs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">{spec.label}</p>
                      <p className="text-sm text-muted-foreground">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30 inline-block">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-3">{t('odrl.cta.title')}</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {t('odrl.cta.description')}
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link to="/auth">{t('common.tryDemo')}</Link>
                </Button>
                <Button asChild>
                  <Link to="/architecture">{t('common.viewArchitecture')}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <FundingFooter variant="light" showTransparency={false} />
    </div>
  );
}
