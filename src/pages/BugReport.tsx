import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bug, Send, AlertTriangle, CheckCircle, Clock, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface BugReportItem {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'resolved';
  author: string;
  date: string;
  aiResponse?: string;
}

const mockBugs: BugReportItem[] = [
  {
    id: '1',
    title: 'Photo de profil ne s\'importe pas sur Android',
    description: 'Quand on essaie de parcourir ou prendre une photo sur Android, le fichier est rejeté.',
    status: 'in_progress',
    author: 'Rabe Jean',
    date: '10 Mars 2026',
    aiResponse: 'J\'ai identifié le problème : le type MIME n\'était pas correctement vérifié pour les fichiers capturés depuis l\'appareil photo Android. Correction appliquée — la validation accepte maintenant les fichiers par extension en plus du type MIME.',
  },
  {
    id: '2',
    title: 'Les chapitres sont trop courts',
    description: 'Les chapitres générés par l\'IA sont trop résumés et perdent leur valeur éducative.',
    status: 'resolved',
    author: 'Noro Fanja',
    date: '8 Mars 2026',
    aiResponse: 'Corrigé ! Les chapitres sont maintenant générés avec un contenu détaillé comprenant : contexte historique, définitions complètes, exemples pratiques, études de cas, et exercices. Chaque chapitre fait minimum 3 pages.',
  },
  {
    id: '3',
    title: 'Messages qui fusionnent entre sessions',
    description: 'Les messages de la session "Math L1" apparaissent aussi dans "Informatique L1".',
    status: 'resolved',
    author: 'Hery Tiana',
    date: '5 Mars 2026',
    aiResponse: 'Bug résolu. Chaque message est maintenant associé à un identifiant de session unique. Les messages ne se mélangent plus entre les différentes sessions de discussion.',
  },
];

const statusConfig = {
  pending: { label: 'En attente', icon: Clock, className: 'text-warning bg-warning/10' },
  in_progress: { label: 'En cours', icon: AlertTriangle, className: 'text-primary bg-primary/10' },
  resolved: { label: 'Résolu', icon: CheckCircle, className: 'text-success bg-success/10' },
};

export default function BugReport() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bugs, setBugs] = useState(mockBugs);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      toast.error('Veuillez remplir tous les champs.');
      return;
    }

    const newBug: BugReportItem = {
      id: `b${Date.now()}`,
      title,
      description,
      status: 'pending',
      author: 'Moi',
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
    };

    setBugs([newBug, ...bugs]);
    setTitle('');
    setDescription('');
    toast.success('Bug signalé ! L\'IA va l\'analyser automatiquement.');

    // Simulate AI response after 2 seconds
    setTimeout(() => {
      setBugs((prev) =>
        prev.map((b) =>
          b.id === newBug.id
            ? {
                ...b,
                status: 'in_progress' as const,
                aiResponse: 'J\'ai bien reçu votre signalement. J\'analyse le problème et je travaille sur une solution. Vous serez notifié dès que la correction sera appliquée.',
              }
            : b
        )
      );
      toast.info('🤖 L\'IA a commencé à analyser votre bug.');
    }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
          <Bug className="w-7 h-7 text-accent" />
          Signaler un bug
        </h1>
        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          L'IA analyse et résout automatiquement les problèmes signalés
        </p>
      </div>

      {/* Submit Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-5"
      >
        <input
          type="text"
          placeholder="Titre du problème"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 mb-3"
        />
        <textarea
          placeholder="Décrivez le problème en détail..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none mb-3"
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
        >
          <Send className="w-4 h-4" />
          Envoyer le signalement
        </motion.button>
      </motion.div>

      {/* Bug List */}
      <div className="space-y-3">
        <h2 className="font-display font-semibold text-foreground">Signalements récents</h2>
        {bugs.map((bug, i) => {
          const status = statusConfig[bug.status];
          return (
            <motion.div
              key={bug.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-5"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground">{bug.title}</h3>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${status.className}`}>
                  <status.icon className="w-3 h-3" />
                  {status.label}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{bug.description}</p>
              <p className="text-xs text-muted-foreground">Par {bug.author} • {bug.date}</p>

              {bug.aiResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-3 rounded-xl bg-accent/5 border border-accent/20"
                >
                  <p className="text-xs font-medium text-accent flex items-center gap-1 mb-1">
                    <Sparkles className="w-3 h-3" />
                    Réponse de l'IA
                  </p>
                  <p className="text-sm text-foreground/80">{bug.aiResponse}</p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
