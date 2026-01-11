import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { MapPin, Award, Building2 } from "lucide-react";
import type { PremiumPartner } from "@/data/premiumPartnersData";

interface PremiumPartnerHeroProps {
  partner: PremiumPartner;
}

export const PremiumPartnerHero = ({ partner }: PremiumPartnerHeroProps) => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Premium Partner Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-6"
          >
            <Badge 
              variant="outline" 
              className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
            >
              <Award className="w-4 h-4 mr-2" />
              PROCUREDATA PREMIUM PARTNER
            </Badge>
          </motion.div>

          {/* Country Flag & Vertical */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="text-4xl">{partner.country.flag}</span>
            <Badge variant="secondary" className="text-sm">
              {partner.vertical}
            </Badge>
          </motion.div>

          {/* Partner Name */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          >
            {partner.name}
          </motion.h1>

          {/* Full Name */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground mb-2"
          >
            {partner.fullName}
          </motion.p>

          {/* Headquarters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8"
          >
            <MapPin className="w-4 h-4" />
            <span>{partner.authorityContext.headquarters}</span>
          </motion.div>

          {/* Authority Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12"
          >
            {partner.authorityContext.narrative}
          </motion.p>

          {/* Key Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {partner.authorityContext.keyStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl blur-xl group-hover:blur-2xl transition-all opacity-50" />
                <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-colors">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
