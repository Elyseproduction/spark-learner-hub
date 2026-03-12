import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Download, ChevronDown, ChevronUp, Sparkles, FileText } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

// Mock detailed chapters with longer content
const mockChapters = [
  {
    id: '1',
    title: 'Chapitre 1 : Introduction et fondements',
    content: `## 1. Introduction générale

Ce chapitre constitue une introduction approfondie aux concepts fondamentaux de la matière. Il est essentiel de bien comprendre ces bases avant d'aborder les chapitres suivants.

### 1.1 Contexte historique

L'étude de cette discipline remonte à plusieurs siècles. Les premiers travaux significatifs ont été réalisés au XVIIe siècle, posant les fondations de ce que nous connaissons aujourd'hui. Les contributions majeures de grands penseurs ont permis d'établir un cadre théorique solide.

Les développements historiques peuvent être divisés en plusieurs périodes clés :
- **Période classique (XVIIe-XVIIIe siècle)** : Établissement des principes fondamentaux
- **Période moderne (XIXe siècle)** : Formalisation mathématique et développement des théories
- **Période contemporaine (XXe-XXIe siècle)** : Applications pratiques et innovations technologiques

### 1.2 Définitions et concepts clés

**Définition 1** : Le concept principal se définit comme l'ensemble des propriétés et relations qui caractérisent un système donné dans un contexte spécifique.

**Définition 2** : Les axiomes fondamentaux constituent les postulats de base à partir desquels toute la théorie est construite. Ces axiomes sont considérés comme vrais sans nécessité de démonstration.

### 1.3 Méthodologie d'étude

Pour aborder efficacement cette matière, il est recommandé de suivre une approche structurée :

1. **Lecture approfondie** : Lire chaque section attentivement, en prenant des notes
2. **Exercices pratiques** : Résoudre les exercices proposés à la fin de chaque section
3. **Révision régulière** : Revoir les concepts clés à intervalles réguliers
4. **Discussion et échange** : Participer aux discussions communautaires pour approfondir la compréhension

### 1.4 Objectifs d'apprentissage

À la fin de ce chapitre, l'étudiant devra être capable de :
- Identifier et expliquer les concepts fondamentaux
- Appliquer les définitions de base dans des contextes variés
- Analyser des problèmes simples en utilisant les outils présentés
- Synthétiser les informations pour construire une compréhension globale

### 1.5 Plan du cours

Le cours est organisé en modules progressifs, chacun construisant sur les connaissances acquises précédemment. Cette approche spiralaire permet un apprentissage en profondeur tout en maintenant une vision d'ensemble cohérente.`,
  },
  {
    id: '2',
    title: 'Chapitre 2 : Théories et applications',
    content: `## 2. Théories fondamentales et leurs applications

Ce chapitre approfondit les théories essentielles et montre comment elles s'appliquent dans des situations concrètes.

### 2.1 Cadre théorique

Le cadre théorique de cette discipline repose sur plusieurs piliers fondamentaux qui ont été développés et affinés au fil des décennies. Chaque pilier apporte une perspective unique et complémentaire.

**Premier pilier - L'analyse systémique** : Cette approche considère chaque problème comme un système complexe composé d'éléments interconnectés. L'analyse systémique permet de comprendre les interactions entre les différentes composantes et d'identifier les leviers d'action les plus efficaces.

**Deuxième pilier - La modélisation** : La modélisation consiste à créer des représentations simplifiées de la réalité. Ces modèles peuvent être mathématiques, graphiques ou conceptuels. Ils permettent de tester des hypothèses et de prédire des résultats sans avoir à manipuler le système réel.

### 2.2 Applications pratiques

Les applications de ces théories sont nombreuses et variées. Voici quelques exemples concrets :

#### Application 1 : Résolution de problèmes
La méthode de résolution structurée se décompose en étapes claires :
1. Identification du problème et de ses paramètres
2. Formulation des hypothèses
3. Application des outils théoriques appropriés
4. Vérification et validation des résultats
5. Interprétation et communication des conclusions

#### Application 2 : Analyse de données
L'analyse de données utilise les concepts théoriques pour extraire des informations significatives à partir d'ensembles de données brutes.

### 2.3 Études de cas

Plusieurs études de cas sont présentées pour illustrer l'application des théories dans des contextes réels. Chaque étude de cas comprend une description du contexte, une analyse détaillée et des conclusions pratiques.`,
  },
  {
    id: '3',
    title: 'Chapitre 3 : Méthodes avancées',
    content: `## 3. Méthodes avancées et techniques spécialisées

Ce chapitre présente les méthodes avancées qui permettent d'aborder des problèmes plus complexes avec des outils plus sophistiqués.

### 3.1 Techniques de résolution avancée

Les techniques avancées nécessitent une bonne maîtrise des concepts fondamentaux présentés dans les chapitres précédents. Elles permettent de traiter des cas qui ne peuvent pas être résolus avec les méthodes de base.

### 3.2 Optimisation et performance

L'optimisation est un aspect crucial de l'application pratique des théories. Elle permet de trouver les meilleures solutions possibles sous des contraintes données.

### 3.3 Exercices avancés

Des exercices de niveau avancé sont proposés pour permettre aux étudiants de tester leur compréhension approfondie des concepts.`,
  },
];

export default function CourseDetail() {
  const { id } = useParams();
  const [expandedChapter, setExpandedChapter] = useState<string | null>('1');

  const handleDownloadPDF = (chapter: typeof mockChapters[0]) => {
    // Create a text blob and download as a simple file
    const blob = new Blob([`${chapter.title}\n\n${chapter.content}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chapter.title}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/courses" className="p-2 rounded-xl glass-hover transition-all">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Mathématiques
          </h1>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Chapitres détaillés générés par IA • {mockChapters.length} chapitres
          </p>
        </div>
      </div>

      {/* Chapters */}
      <div className="space-y-3">
        {mockChapters.map((chapter, index) => (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-2xl overflow-hidden"
          >
            {/* Chapter Header */}
            <button
              onClick={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
              className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-sm font-bold text-primary">
                  {index + 1}
                </div>
                <span className="font-semibold text-foreground text-left">{chapter.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadPDF(chapter);
                  }}
                  className="p-2 rounded-lg hover:bg-primary/15 transition-colors"
                  title="Télécharger en PDF"
                >
                  <Download className="w-4 h-4 text-primary" />
                </motion.button>
                {expandedChapter === chapter.id ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </button>

            {/* Chapter Content */}
            <AnimatePresence>
              {expandedChapter === chapter.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 border-t border-border/50">
                    <div className="prose prose-invert prose-sm max-w-none mt-4 text-foreground/90 whitespace-pre-line leading-relaxed">
                      {chapter.content}
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Contenu généré par IA — Chapitres complets et détaillés
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
