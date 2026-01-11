import { motion } from "framer-motion";
import { Building2, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { EcosystemCompany } from "@/data/premiumPartnersData";

interface EcosystemSectionProps {
  ecosystem: EcosystemCompany[];
  partnerName: string;
}

export const EcosystemSection = ({ ecosystem, partnerName }: EcosystemSectionProps) => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Líderes del Ecosistema{" "}
            <span className="text-primary">{partnerName}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Empresas de clase mundial que forman parte de esta red de conocimiento y datos
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {ecosystem.map((company, index) => (
            <Tooltip key={company.name}>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="p-6 h-full hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group bg-card/50 backdrop-blur-sm">
                    <div className="flex flex-col items-center text-center gap-3">
                      {company.logo ? (
                        <img 
                          src={company.logo} 
                          alt={company.name}
                          className="h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-all"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-colors">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                          {company.name}
                        </h3>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent 
                side="bottom" 
                className="max-w-xs"
              >
                <p className="text-sm">
                  <span className="font-semibold">{company.name}</span>
                  <br />
                  {company.description}
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
        </motion.div>

        {/* Decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground italic">
            "Dime con quién andas y te diré quién eres" — El poder de la red
          </p>
        </motion.div>
      </div>
    </section>
  );
};
