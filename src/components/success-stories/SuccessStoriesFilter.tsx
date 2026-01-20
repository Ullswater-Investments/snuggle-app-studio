import React from 'react';
import { LayoutGrid, Leaf } from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { superCategories, transversalTags } from '@/data/sectorSuperCategories';

interface SuccessStoriesFilterProps {
  activeSuperCategory: string;
  onSuperCategoryChange: (superCategory: string) => void;
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
  superCategoryCounts: Record<string, number>;
  tagCounts: Record<string, number>;
}

export function SuccessStoriesFilter({ 
  activeSuperCategory, 
  onSuperCategoryChange,
  activeTag,
  onTagChange,
  superCategoryCounts,
  tagCounts
}: SuccessStoriesFilterProps) {
  const { t } = useTranslation('success');
  
  // Get total count for "all"
  const totalCount = Object.values(superCategoryCounts).reduce((a, b) => a + b, 0);
  
  // Handle Green Procurement toggle
  const handleGreenProcurementToggle = () => {
    if (activeTag === 'green-procurement') {
      onTagChange(null);
    } else {
      onTagChange('green-procurement');
    }
  };

  return (
    <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b py-4 mb-8">
      <div className="flex flex-col gap-4">
        {/* Green Procurement Strategic Toggle */}
        <div className="flex items-center justify-center md:justify-start">
          <motion.button
            onClick={handleGreenProcurementToggle}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 border-2",
              activeTag === 'green-procurement'
                ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/30"
                : "text-emerald-600 border-emerald-600/30 bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 hover:border-emerald-600/50"
            )}
          >
            <Leaf className="w-5 h-5" />
            <span>{t('transversalTags.greenProcurement')}</span>
            {tagCounts['green-procurement'] > 0 && (
              <span className={cn(
                "text-xs font-bold px-2 py-0.5 rounded-full ml-1",
                activeTag === 'green-procurement'
                  ? "bg-white/20 text-white"
                  : "bg-emerald-600/10 text-emerald-600"
              )}>
                {tagCounts['green-procurement']}
              </span>
            )}
          </motion.button>
        </div>

        {/* Super-Categories Row */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max px-1">
            {superCategories.map((superCat) => {
              const isActive = activeSuperCategory === superCat.id;
              const Icon = superCat.icon;
              const count = superCat.id === 'all' 
                ? totalCount
                : superCategoryCounts[superCat.id] || 0;
              
              return (
                <motion.button
                  key={superCat.id}
                  onClick={() => onSuperCategoryChange(superCat.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
                    isActive 
                      ? cn(superCat.activeBg, "text-white shadow-lg scale-105") 
                      : cn("text-muted-foreground hover:text-foreground", superCat.bgColor, "hover:shadow-md")
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{t(superCat.labelKey)}</span>
                  {count > 0 && (
                    <span className={cn(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                      isActive 
                        ? "bg-white/20 text-white" 
                        : "bg-muted text-muted-foreground"
                    )}>
                      {count}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
