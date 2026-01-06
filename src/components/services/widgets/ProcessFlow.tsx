import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type ProcessState = 'idle' | 'processing' | 'success';

export const ProcessFlow = () => {
  const [status, setStatus] = useState<ProcessState>('idle');

  const runSimulation = () => {
    if (status !== 'idle') return;
    setStatus('processing');
    setTimeout(() => setStatus('success'), 2000);
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <div className="p-4 rounded-lg bg-muted/30">
      {/* Flow Diagram */}
      <div className="relative flex items-center justify-between h-16">
        {/* Connector Line */}
        <motion.div
          className="absolute inset-x-12 top-1/2 h-1 -translate-y-1/2 rounded-full overflow-hidden bg-muted"
        >
          <motion.div
            className="h-full bg-primary"
            initial={{ width: '0%' }}
            animate={{
              width: status === 'idle' ? '0%' : status === 'processing' ? '50%' : '100%',
            }}
            transition={{ duration: status === 'processing' ? 1 : 0.5 }}
          />
        </motion.div>

        {/* Input Node */}
        <motion.div
          className="relative z-10 flex flex-col items-center"
          animate={{
            opacity: status === 'success' ? 0.5 : 1,
          }}
        >
          <motion.div
            className="p-2 rounded-full"
            animate={{
              backgroundColor: status === 'idle' ? 'hsl(var(--destructive) / 0.2)' : 'hsl(var(--muted))',
            }}
          >
            <FileText
              className={`h-5 w-5 ${
                status === 'idle' ? 'text-destructive' : 'text-muted-foreground'
              }`}
            />
          </motion.div>
          <span className="text-[10px] text-muted-foreground mt-1">Input</span>
        </motion.div>

        {/* Processor Node */}
        <motion.div className="relative z-10 flex flex-col items-center">
          <motion.div
            className="p-3 rounded-full bg-primary/20"
            animate={{
              scale: status === 'processing' ? [1, 1.1, 1] : 1,
              boxShadow: status === 'processing' 
                ? '0 0 20px hsl(var(--primary) / 0.4)' 
                : '0 0 0px hsl(var(--primary) / 0)',
            }}
            transition={{
              scale: { repeat: status === 'processing' ? Infinity : 0, duration: 0.6 },
            }}
          >
            <motion.div
              animate={{ rotate: status === 'processing' ? 360 : 0 }}
              transition={{ repeat: status === 'processing' ? Infinity : 0, duration: 1, ease: 'linear' }}
            >
              <RefreshCw className="h-5 w-5 text-primary" />
            </motion.div>
          </motion.div>
          <span className="text-[10px] text-muted-foreground mt-1">Proceso</span>
        </motion.div>

        {/* Output Node */}
        <motion.div
          className="relative z-10 flex flex-col items-center"
          animate={{
            opacity: status === 'success' ? 1 : 0.5,
            scale: status === 'success' ? [1, 1.2, 1] : 1,
          }}
          transition={{ scale: { duration: 0.3 } }}
        >
          <motion.div
            className="p-2 rounded-full"
            animate={{
              backgroundColor: status === 'success' 
                ? 'hsl(142 76% 36% / 0.2)' 
                : 'hsl(var(--muted))',
            }}
          >
            <ShieldCheck
              className={`h-5 w-5 ${
                status === 'success' ? 'text-green-600' : 'text-muted-foreground'
              }`}
            />
          </motion.div>
          <span className="text-[10px] text-muted-foreground mt-1">Output</span>
        </motion.div>
      </div>

      {/* Action/Status Area */}
      <div className="mt-4 text-center">
        {status === 'idle' && (
          <Button size="sm" variant="outline" onClick={runSimulation}>
            Simular Proceso
          </Button>
        )}
        {status === 'processing' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground"
          >
            Procesando datos...
          </motion.p>
        )}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              100% Compliant
            </Badge>
          </motion.div>
        )}
      </div>
    </div>
  );
};
