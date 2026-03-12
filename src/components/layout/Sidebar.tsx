import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home, BookOpen, MessageCircle, User, Bug, Download,
  GraduationCap, X, Sparkles
} from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', icon: Home, label: 'Accueil' },
  { to: '/courses', icon: BookOpen, label: 'Cours' },
  { to: '/community', icon: MessageCircle, label: 'Communauté' },
  { to: '/profile', icon: User, label: 'Profil' },
  { to: '/bugs', icon: Bug, label: 'Signaler un bug' },
];

interface SidebarProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation();
  const { isInstallable, isInstalled, install } = usePWAInstall();

  return (
    <div className="w-64 h-screen glass flex flex-col border-r border-border/50">
      {/* Logo */}
      <div className="p-5 flex items-center justify-between border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold text-foreground text-lg">CNTEMAD</h1>
            <p className="text-xs text-muted-foreground">Espace Étudiant</p>
          </div>
        </div>
        <button onClick={onClose} className="md:hidden p-1 rounded-lg hover:bg-muted transition-colors">
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.to;
          return (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <NavLink
                to={item.to}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary/15 text-primary glow-primary border border-primary/20'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                )}
              >
                <item.icon className={cn('w-5 h-5', isActive && 'drop-shadow-lg')} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                  />
                )}
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      {/* Install Button */}
      <div className="p-3 border-t border-border/50">
        {!isInstalled && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={isInstallable ? install : undefined}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300',
              isInstallable
                ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground animate-pulse-glow cursor-pointer'
                : 'glass-hover text-muted-foreground'
            )}
          >
            <Download className="w-5 h-5" />
            <span>{isInstallable ? 'Installer l\'app' : 'Installer l\'app'}</span>
            {isInstallable && <Sparkles className="w-4 h-4 ml-auto" />}
          </motion.button>
        )}

        {/* AI Badge */}
        <div className="mt-3 flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 border border-accent/20">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-xs text-accent font-medium">Propulsé par IA</span>
        </div>
      </div>
    </div>
  );
}
