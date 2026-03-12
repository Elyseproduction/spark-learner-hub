import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, BookOpen, MessageCircle, Calendar } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const mockUsers: Record<string, { name: string; avatar: string; bio: string; location: string; level: string; joinDate: string; messages: number }> = {
  u1: { name: 'Rabe Jean', avatar: '👨‍🎓', bio: 'Étudiant L1 en Informatique. Passionné de dev.', location: 'Antananarivo', level: 'L1', joinDate: 'Sept 2024', messages: 87 },
  u2: { name: 'Noro Fanja', avatar: '👩‍🎓', bio: 'Étudiante L2 en Mathématiques. J\'adore aider.', location: 'Fianarantsoa', level: 'L2', joinDate: 'Sept 2023', messages: 234 },
  u3: { name: 'Hery Tiana', avatar: '🧑‍💻', bio: 'L1 Sciences. Futur ingénieur !', location: 'Toamasina', level: 'L1', joinDate: 'Sept 2024', messages: 56 },
  u4: { name: 'Solo Andry', avatar: '👨‍💻', bio: 'Étudiant en économie, L1.', location: 'Mahajanga', level: 'L1', joinDate: 'Sept 2024', messages: 31 },
};

export default function UserProfile() {
  const { id } = useParams();
  const user = mockUsers[id || ''] || mockUsers.u1;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-2xl mx-auto">
      <Link to="/community" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Retour à la communauté
      </Link>

      <div className="glass rounded-2xl overflow-hidden">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10" />

        {/* Profile Info */}
        <div className="px-6 pb-6 -mt-10">
          <div className="w-20 h-20 rounded-2xl bg-muted border-4 border-card flex items-center justify-center text-3xl mb-3">
            {user.avatar}
          </div>
          <h1 className="font-display text-xl font-bold text-foreground">{user.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">{user.bio}</p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { icon: MapPin, value: user.location },
              { icon: BookOpen, value: user.level },
              { icon: Calendar, value: `Membre depuis ${user.joinDate}` },
              { icon: MessageCircle, value: `${user.messages} messages` },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <item.icon className="w-4 h-4 text-primary" />
                {item.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
