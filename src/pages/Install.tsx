import { motion } from 'framer-motion';
import { Download, Smartphone, Check, Sparkles } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';

export default function Install() {
  const { isInstallable, isInstalled, install } = usePWAInstall();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg mx-auto text-center space-y-6 py-8">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto glow-primary"
      >
        <Smartphone className="w-10 h-10 text-primary-foreground" />
      </motion.div>

      <div>
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          Installer CNTEMAD Student
        </h1>
        <p className="text-muted-foreground">
          Installez l'application pour un accès rapide et une expérience optimale.
        </p>
      </div>

      {isInstalled ? (
        <div className="glass rounded-2xl p-6 flex items-center gap-3 justify-center">
          <Check className="w-6 h-6 text-success" />
          <span className="text-success font-medium">Application déjà installée !</span>
        </div>
      ) : isInstallable ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={install}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold text-lg flex items-center justify-center gap-3 animate-pulse-glow"
        >
          <Download className="w-6 h-6" />
          Installer maintenant
          <Sparkles className="w-5 h-5" />
        </motion.button>
      ) : (
        <div className="glass rounded-2xl p-6 space-y-4">
          <p className="text-muted-foreground text-sm">
            Pour installer l'app manuellement :
          </p>
          <div className="text-left space-y-3">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-sm flex items-center justify-center shrink-0 font-bold">1</span>
              <p className="text-sm text-foreground"><strong>Android :</strong> Menu du navigateur → "Ajouter à l'écran d'accueil"</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-sm flex items-center justify-center shrink-0 font-bold">2</span>
              <p className="text-sm text-foreground"><strong>iPhone :</strong> Partager → "Sur l'écran d'accueil"</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
