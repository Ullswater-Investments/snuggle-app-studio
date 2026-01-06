import { motion } from "framer-motion";
import { Sprout, TreePine, Trees, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface GrowthTreeProps {
  level: 1 | 2 | 3 | 4 | 5;
  progress: number;
  totalPoints: number;
  badges: string[];
}

const levelConfig = [
  { name: "Semilla", icon: "🌱", color: "from-lime-400 to-green-500", nextPoints: 50 },
  { name: "Brote", icon: "🌿", color: "from-green-400 to-emerald-500", nextPoints: 100 },
  { name: "Planta", icon: "🪴", color: "from-emerald-400 to-teal-500", nextPoints: 200 },
  { name: "Árbol", icon: "🌳", color: "from-teal-400 to-cyan-500", nextPoints: 300 },
  { name: "Bosque", icon: "🌲", color: "from-cyan-400 to-blue-500", nextPoints: 400 }
];

export const GrowthTree = ({
  level,
  progress,
  totalPoints,
  badges
}: GrowthTreeProps) => {
  const config = levelConfig[level - 1];
  const nextConfig = levelConfig[level] || levelConfig[4];
  const pointsToNext = nextConfig.nextPoints - totalPoints;

  // Tree SVG based on level
  const TreeVisualization = () => {
    const baseDelay = 0.3;
    
    return (
      <div className="relative w-32 h-40 mx-auto">
        {/* Ground */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-3 bg-gradient-to-t from-amber-800 to-amber-600 rounded-full"
        />
        
        {/* Trunk - grows with level */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${Math.min(level * 15 + 10, 60)}%` }}
          transition={{ duration: 0.8, delay: baseDelay }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 bg-gradient-to-t from-amber-900 to-amber-700 rounded-t-lg origin-bottom"
        />
        
        {/* Foliage layers based on level */}
        {level >= 2 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: baseDelay + 0.3, type: "spring" }}
            className="absolute bottom-[45%] left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-t from-green-600 to-green-400 rounded-full"
          />
        )}
        
        {level >= 3 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: baseDelay + 0.5, type: "spring" }}
            className="absolute bottom-[55%] left-1/2 -translate-x-1/2 w-20 h-14 bg-gradient-to-t from-green-500 to-emerald-400 rounded-full"
          />
        )}
        
        {level >= 4 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: baseDelay + 0.7, type: "spring" }}
            className="absolute bottom-[65%] left-1/2 -translate-x-1/2 w-14 h-12 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-full"
          />
        )}
        
        {level >= 5 && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: baseDelay + 0.9, type: "spring" }}
              className="absolute bottom-[75%] left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-t from-teal-500 to-cyan-400 rounded-full"
            />
            {/* Extra trees for forest level */}
            <motion.div
              initial={{ scale: 0, x: -10 }}
              animate={{ scale: 0.6, x: -25 }}
              transition={{ duration: 0.5, delay: baseDelay + 1.1, type: "spring" }}
              className="absolute bottom-3 left-1/2 w-3 h-12 bg-gradient-to-t from-amber-900 to-amber-700 rounded-t-lg"
            />
            <motion.div
              initial={{ scale: 0, x: 10 }}
              animate={{ scale: 0.6, x: 25 }}
              transition={{ duration: 0.5, delay: baseDelay + 1.2, type: "spring" }}
              className="absolute bottom-3 left-1/2 w-3 h-10 bg-gradient-to-t from-amber-900 to-amber-700 rounded-t-lg"
            />
          </>
        )}
        
        {/* Leaves animation for level 1 */}
        {level === 1 && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: baseDelay + 0.3, type: "spring" }}
            className="absolute bottom-[35%] left-1/2 -translate-x-1/2"
          >
            <Sprout className="h-10 w-10 text-green-500" />
          </motion.div>
        )}
        
        {/* Floating particles for higher levels */}
        {level >= 3 && (
          <>
            {[...Array(level)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: [-20, -40],
                  x: [0, (i % 2 === 0 ? 10 : -10)]
                }}
                transition={{ 
                  duration: 3,
                  delay: baseDelay + 1 + i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="absolute bottom-[60%] left-1/2"
              >
                <Leaf className="h-3 w-3 text-green-400" />
              </motion.div>
            ))}
          </>
        )}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={cn(
        "h-full border-green-200 dark:border-green-800",
        "bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-950/20 dark:to-emerald-950/10"
      )}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TreePine className="h-5 w-5 text-green-600" />
              Tu Árbol de Sostenibilidad
            </CardTitle>
            <Badge variant="outline" className="text-xs bg-green-100 dark:bg-green-900/30 border-green-300">
              {totalPoints} pts
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tree Visualization */}
          <TreeVisualization />
          
          {/* Level Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center space-y-2"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl">{config.icon}</span>
              <span className="text-lg font-bold">Nivel {level}: {config.name}</span>
            </div>
            
            {/* Progress to next level */}
            {level < 5 && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progreso al siguiente nivel</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  +{pointsToNext} pts para <span className="font-medium">{nextConfig.icon} {nextConfig.name}</span>
                </p>
              </div>
            )}
            
            {level === 5 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-sm text-green-600 font-medium"
              >
                🎉 ¡Nivel máximo alcanzado!
              </motion.p>
            )}
          </motion.div>
          
          {/* Badges */}
          {badges.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-1.5 justify-center"
            >
              {badges.slice(0, 4).map((badge, index) => (
                <motion.div
                  key={badge}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, type: "spring" }}
                >
                  <Badge 
                    variant="secondary" 
                    className="text-xs bg-green-100 dark:bg-green-900/40 hover:bg-green-200 transition-colors"
                  >
                    {badge}
                  </Badge>
                </motion.div>
              ))}
              {badges.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{badges.length - 4} más
                </Badge>
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
