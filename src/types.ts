export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: 'ear' | 'nose' | 'throat' | 'pediatric' | 'audiometry' | 'cancer';
  image?: string;
  procedures: string[];
  equipmentUsed: string;
  advantages: string[];
}

export interface DoctorProfile {
  name: string;
  qualifications: string;
  title: string;
  experience: string;
  affiliations: string[];
  fellowships: string[];
  bio: string;
  specialties: string[];
  achievements: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
  treatment: string;
  avatarText: string;
}

export interface ClinicStat {
  value: string;
  label: string;
  sublabel: string;
  icon: 'patients' | 'doctors' | 'experience' | 'surgeries';
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface EquipmentItem {
  name: string;
  origin: string;
  role: string;
  description: string;
  image: string;
}
