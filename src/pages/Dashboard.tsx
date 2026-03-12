import { motion } from 'framer-motion';
import { BookOpen, MessageCircle, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Cours disponibles', value: '24', icon: BookOpen, color: 'primary' },
  { label: 'Discussions actives', value: '156', icon: MessageCircle, color: 'secondary' },
  { label: 'Progression', value: '67%', icon: TrendingUp, color: 'accent' },
];

const quickActions = [
  { label: 'Voir les cours', to: '/courses', icon: BookOpen, description: 'Accédez à vos matières et chapitres' },
  { label: 'Communauté', to: '/community', icon: MessageCircle, description: 'Discussions et entraide' },
  { label: 'Signaler un bug', to: '/bugs', icon: Sparkles, description: 'Aidez à améliorer l\'app' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Welcome */}
      <motion.div variants={item} className="relative overflow-hidden rounded-2xl glass p-6 md:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="relative">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Bienvenue sur <span className="gradient-text">CNTEMAD Student</span>
          </h1>
          <p className="text-muted-foreground max-w-lg">
            Votre plateforme d'apprentissage intelligente. Cours générés par IA, communauté active, et plus encore.
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={item}
            whileHover={{ scale: 1.03, y: -2 }}
            className="glass-hover rounded-2xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}/15 flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}`} />
              </div>
            </div>
            <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div variants={item}>
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">Accès rapide</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <motion.div key={action.to} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to={action.to}
                className="block glass-hover rounded-2xl p-5 group"
              >
                <action.icon className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  {action.label}
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                </h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
