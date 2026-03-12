import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Edit2, MapPin, Mail, Phone, Calendar, BookOpen, Award, Save, X } from 'lucide-react';
import { toast } from 'sonner';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    name: 'Étudiant CNTEMAD',
    bio: 'Étudiant en Licence 1 — Passionné par les sciences et la technologie',
    location: 'Antananarivo, Madagascar',
    email: 'etudiant@cntemad.mg',
    phone: '+261 34 00 000 00',
    birthDate: '01/01/2000',
    level: 'L1',
    faculty: 'Sciences et Technologies',
  });

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string | null) => void,
    label: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Accept common image formats, including HEIC
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif'];
    const isValidByType = validTypes.includes(file.type);
    const isValidByExtension = /\.(jpg|jpeg|png|webp|gif|heic|heif)$/i.test(file.name);

    if (!isValidByType && !isValidByExtension) {
      toast.error('Format non supporté. Utilisez JPG, PNG ou WebP.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('L\'image est trop volumineuse (max 10 Mo).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setter(ev.target?.result as string);
      toast.success(`${label} mis à jour !`);
    };
    reader.onerror = () => {
      toast.error('Erreur lors de la lecture de l\'image. Essayez un autre fichier.');
    };
    reader.readAsDataURL(file);

    // Reset input to allow re-selection of the same file
    e.target.value = '';
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-3xl mx-auto">
      {/* Cover Photo */}
      <div className="relative rounded-2xl overflow-hidden glass">
        <div
          className="h-48 md:h-56 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/10 relative"
          style={coverPhoto ? { backgroundImage: `url(${coverPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
          <button
            onClick={() => coverInputRef.current?.click()}
            className="absolute bottom-3 right-3 p-2 rounded-xl glass-hover text-foreground text-sm flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            <span className="hidden sm:inline">Changer la couverture</span>
          </button>
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e, setCoverPhoto, 'Photo de couverture')}
          />
        </div>

        {/* Profile Photo */}
        <div className="px-6 pb-6 -mt-14 relative">
          <div className="flex items-end gap-4">
            <div className="relative">
              <div
                className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-muted border-4 border-card flex items-center justify-center text-4xl overflow-hidden"
                style={profilePhoto ? { backgroundImage: `url(${profilePhoto})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              >
                {!profilePhoto && '🎓'}
              </div>
              <button
                onClick={() => profileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
              <input
                ref={profileInputRef}
                type="file"
                accept="image/*"
                capture={undefined}
                className="hidden"
                onChange={(e) => handleImageUpload(e, setProfilePhoto, 'Photo de profil')}
              />
            </div>
            <div className="flex-1 pt-16 md:pt-14">
              <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">{profile.name}</h1>
              <p className="text-sm text-muted-foreground">{profile.bio}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (isEditing) toast.success('Profil sauvegardé !');
                setIsEditing(!isEditing);
              }}
              className={`p-2.5 rounded-xl transition-all ${
                isEditing ? 'bg-success text-success-foreground' : 'glass-hover text-foreground'
              }`}
            >
              {isEditing ? <Save className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6"
      >
        <h2 className="font-display font-semibold text-foreground mb-4">Informations personnelles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: MapPin, label: 'Localisation', key: 'location' as const },
            { icon: Mail, label: 'Email', key: 'email' as const },
            { icon: Phone, label: 'Téléphone', key: 'phone' as const },
            { icon: Calendar, label: 'Date de naissance', key: 'birthDate' as const },
            { icon: BookOpen, label: 'Niveau', key: 'level' as const },
            { icon: Award, label: 'Faculté', key: 'faculty' as const },
          ].map((field) => (
            <div key={field.key} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <field.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">{field.label}</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile[field.key]}
                    onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                    className="w-full text-sm text-foreground bg-transparent border-b border-primary/30 focus:outline-none focus:border-primary py-0.5"
                  />
                ) : (
                  <p className="text-sm text-foreground truncate">{profile[field.key]}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-4"
      >
        {[
          { label: 'Cours suivis', value: '6' },
          { label: 'Messages', value: '42' },
          { label: 'Bugs signalés', value: '3' },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-2xl p-4 text-center">
            <p className="font-display text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
