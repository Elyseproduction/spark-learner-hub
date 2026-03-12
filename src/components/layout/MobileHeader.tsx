import { Menu, Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

interface MobileHeaderProps {
  onMenuToggle: () => void;
}

export default function MobileHeader({ onMenuToggle }: MobileHeaderProps) {
  return (
    <header className="md:hidden glass border-b border-border/50 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onMenuToggle}
          className="p-2 rounded-xl hover:bg-muted/50 transition-colors"
        >
          <Menu className="w-6 h-6 text-foreground" />
        </motion.button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-foreground">CNTEMAD</span>
        </div>

        <div className="flex items-center gap-1">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <Search className="w-5 h-5 text-muted-foreground" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-xl hover:bg-muted/50 transition-colors relative"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
          </motion.button>
        </div>
      </div>
    </header>
  );
}
