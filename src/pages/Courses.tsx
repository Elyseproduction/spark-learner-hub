import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockCourses = [
  { id: '1', title: 'Mathématiques', chapters: 12, progress: 45, icon: '📐', level: 'L1' },
  { id: '2', title: 'Informatique', chapters: 15, progress: 72, icon: '💻', level: 'L1' },
  { id: '3', title: 'Physique', chapters: 10, progress: 30, icon: '⚛️', level: 'L1' },
  { id: '4', title: 'Anglais', chapters: 8, progress: 90, icon: '🇬🇧', level: 'L1' },
  { id: '5', title: 'Économie', chapters: 11, progress: 15, icon: '📊', level: 'L2' },
  { id: '6', title: 'Droit', chapters: 9, progress: 0, icon: '⚖️', level: 'L2' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Courses() {
  const [search, setSearch] = useState('');
  const [filterLevel, setFilterLevel] = useState<string | null>(null);

  const filtered = mockCourses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchLevel = !filterLevel || c.level === filterLevel;
    return matchSearch && matchLevel;
  });

  const levels = [...new Set(mockCourses.map((c) => c.level))];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-primary" />
            Mes Cours
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Chapitres détaillés générés par IA</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-full sm:w-64"
            />
          </div>
        </div>
      </motion.div>

      {/* Level filters */}
      <motion.div variants={item} className="flex gap-2">
        <button
          onClick={() => setFilterLevel(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            !filterLevel ? 'bg-primary text-primary-foreground' : 'glass-hover text-muted-foreground'
          }`}
        >
          Tous
        </button>
        {levels.map((l) => (
          <button
            key={l}
            onClick={() => setFilterLevel(l)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filterLevel === l ? 'bg-primary text-primary-foreground' : 'glass-hover text-muted-foreground'
            }`}
          >
            {l}
          </button>
        ))}
      </motion.div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((course) => (
          <motion.div key={course.id} variants={item} whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }}>
            <Link to={`/courses/${course.id}`} className="block glass-hover rounded-2xl p-5 group">
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{course.icon}</span>
                <span className="text-xs font-medium text-muted-foreground glass px-2 py-1 rounded-lg">{course.level}</span>
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1 flex items-center gap-2">
                {course.title}
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Clock className="w-3.5 h-3.5" />
                <span>{course.chapters} chapitres</span>
                <Sparkles className="w-3.5 h-3.5 text-accent" />
              </div>
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">{course.progress}% complété</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
