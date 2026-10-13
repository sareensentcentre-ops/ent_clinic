import { ServiceItem, DoctorProfile, Testimonial, ClinicStat, FaqItem, EquipmentItem } from '../types';

export const CLINIC_CONTACT = {
  name: "Sareen's ENT & Head Neck Centre",
  tagline: "Centre of Excellence for Ear, Nose, Throat Diseases and Head Neck Surgery",
  phone: "07905095365",
  phoneFormatted: "079050 95365",
  phoneSecondary: "+91 79050 95365",
  email: "sareenent2021@gmail.com",
  addressLine1: "Flat no B1, behind V2 Mall",
  addressLine2: "Next to Chandra Eye Care, Rashmi Nagar Colony",
  locality: "Lanka, Varanasi, Uttar Pradesh 221005",
  landmark: "Near 200 meters from BHU Gate",
  website: "https://sareenent.com",
  googleMapsUrl: "https://maps.google.com/?q=Sareen's+ENT+Head+Neck+Centre+Lanka+Varanasi",
  opdTimings: {
    days: "Monday – Saturday",
    morning: "9:00 AM – 12:00 PM",
    evening: "5:00 PM – 7:00 PM",
    sunday: "Closed",
  }
};

export const CLINIC_SLOTS = {
  morning: {
    label: "Morning (09:00 AM – 12:00 PM)",
    slots: [
      "09:00 AM",
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM"
    ]
  },
  evening: {
    label: "Evening (05:00 PM – 07:00 PM)",
    slots: [
      "05:00 PM",
      "05:30 PM",
      "06:00 PM",
      "06:30 PM"
    ]
  }
};

export const ALL_SLOTS = [
  ...CLINIC_SLOTS.morning.slots,
  ...CLINIC_SLOTS.evening.slots
];

export const isSundayDate = (dateStr: string): boolean => {
  if (!dateStr) return false;
  const [y, m, d] = dateStr.split('-').map(Number);
  const dateObj = new Date(y, m - 1, d);
  return dateObj.getDay() === 0;
};

export const getNextAvailableBookingDate = (): string => {
  const d = new Date();
  if (d.getDay() === 0) {
    // Jump to Monday if today is Sunday
    d.setDate(d.getDate() + 1);
  }
  return d.toISOString().split('T')[0];
};

export const DOCTOR_PROFILE: DoctorProfile = {
  name: "Dr. Akhil Sareen",
  qualifications: "MBBS, MS (ENT) - IMS BHU",
  title: "Senior ENT Specialist & Head Neck Oncosurgeon",
  experience: "15+ Years of Surgical & Clinical Excellence",
  bio: "Dr. Akhil Sareen is a renowned ENT and Head & Neck Surgeon in Varanasi, having completed his post-graduation (MS ENT) from the prestigious Institute of Medical Sciences, Banaras Hindu University (IMS-BHU). He has completed advanced Fellowships in Head & Neck Surgery (FOHNS) and Endoscopic & Skull Base Surgery. Dr. Sareen leads the ENT department at Apex Super Specialty Hospital and directs Sareen's ENT & Head Neck Centre, where he brings German Zeiss microscopic optics, Karl Storz endoscopic towers, and Coblation technology to deliver precision care with maximum comfort.",
  affiliations: [
    "Director & Senior Consultant, Sareen's ENT & Head Neck Centre, Lanka",
    "Head of Department (ENT), Apex Super Specialty Hospital, Varanasi",
    "Alumnus, Institute of Medical Sciences (IMS), Banaras Hindu University (BHU)",
  ],
  fellowships: [
    "FOHNS (Fellowship of Head, Neck Surgery)",
    "Fellowship in Endoscopic & Skull Base Surgery",
    "Trained in Advanced Coblation & Laser Minimally Invasive Surgeries",
  ],
  specialties: [
    "Advanced Zeiss Microscopic Ear Surgery (Tympanoplasty, Stapedectomy)",
    "Karl Storz Endoscopic Sinus & Skull Base Surgery (FESS, Balloon Sinuplasty)",
    "Head & Neck Cancer Surgery & Reconstruction (Oral, Larynx, Thyroid)",
    "Coblation-assisted Stitchless Bloodless Tonsillectomy & Adenoidectomy",
    "Comprehensive Hearing & Audiometry Diagnostics",
    "Pediatric ENT & Airway Emergencies",
  ],
  achievements: [
    "Over 10,000 successful ENT and Head-Neck surgeries conducted",
    "Over 40,000 diagnostic and therapeutic endoscopic procedures",
    "Published research in national and international otolaryngology journals",
    "Renowned for high cure rates, empathetic bedside manner, and ethical practice",
  ],
};

export const CLINIC_SERVICES: ServiceItem[] = [
  {
    id: "ear-treatment",
    title: "Ear Treatment",
    shortDesc: "Medical evaluation, micro-ear cleaning, eardrum perforation repairs, and stapedectomy.",
    fullDesc: "Sareen's ENT provides comprehensive diagnosis and microscopic surgical management for all ear diseases. Utilizing the German Zeiss Extaro 300 surgical microscope, our centre delivers unmatched optical clarity for microsurgeries including tympanoplasty, stapedectomy, mastoidectomy, and treatment of chronic suppurative otitis media (CSOM).",
    iconName: "ear",
    image: "/images/zeiss-microscope.jpg",
    equipmentUsed: "Zeiss Extaro 300 High-Precision German Surgical Microscope",
    procedures: [
      "Tympanoplasty (Eardrum Hole Repair)",
      "Stapedectomy for Otosclerosis (Hearing Restoration)",
      "Mastoidectomy for Cholesteatoma & Chronic Infection",
      "Microscopic Suction Clearance for Fungus & Wax",
      "Grommet / Ventilation Tube Insertion for Glue Ear",
      "Tinnitus & Vertigo (BPPV / Meniere's) Management",
    ],
    advantages: [
      "High-power German magnification for tissue preservation",
      "Minimally invasive incisions with rapid healing",
      "Day-care surgery with same-day discharge",
      "Over 98% graft success rate",
    ]
  },
  {
    id: "nose-treatment",
    title: "Nose & Sinus Care",
    shortDesc: "Specialized care for deviated septum, nasal polyps, chronic sinusitis, and allergies.",
    fullDesc: "Our clinic is equipped with Karl Storz (Germany) Full-HD endoscopic imaging to diagnose and treat nasal obstructions, chronic sinusitis, nasal polyposis, and allergies. Functional Endoscopic Sinus Surgery (FESS) clears sinus pathways without external scars, providing long-lasting breathing comfort.",
    iconName: "nose",
    image: "/images/clinic-1.jpg",
    equipmentUsed: "Karl Storz Full HD Endoscopic Sinus System & Debrider",
    procedures: [
      "Functional Endoscopic Sinus Surgery (FESS)",
      "Septoplasty for Deviated Nasal Septum (DNS)",
      "Endoscopic Nasal Polypectomy (Microdebrider-assisted)",
      "Turbinate Reduction for Nasal Congestion",
      "Epistaxis (Nosebleed) Endoscopic Cauterization",
      "Allergic Rhinitis Testing & Medical Immunotherapy",
    ],
    advantages: [
      "Zero external facial cuts or scarring",
      "Endoscopic precision preserving healthy mucous membranes",
      "Significant reduction in recurrence of sinus infections",
      "Quick return to routine work within 48-72 hours",
    ]
  },
  {
    id: "throat-treatment",
    title: "Throat & Voice Care",
    shortDesc: "Diagnostic laryngoscopy for voice hoarseness, vocal nodules, tonsils, and swallowing.",
    fullDesc: "We provide comprehensive laryngology evaluation using Karl Storz flexible and rigid endoscopic systems. Diseases of the vocal cords, larynx, pharynx, and tonsils are evaluated with real-time video endoscopy, allowing early diagnosis of polyps, nodules, reflux laryngitis, and vocal cord mobility disorders.",
    iconName: "throat",
    image: "/images/clinic-2.jpg",
    equipmentUsed: "Karl Storz HD Video Laryngoscope & Smith & Nephew Coblation",
    procedures: [
      "Video Laryngoscopy for Hoarseness & Voice Strain",
      "Microlaryngeal Surgery (MLS) for Vocal Cord Nodules & Polyps",
      "Coblation-Assisted Tonsillectomy (Bloodless & Stitchless)",
      "Pharyngitis & Chronic Sore Throat Treatment",
      "Evaluation of Dysphagia (Swallowing Difficulty)",
      "Foreign Body Removal from Throat & Food Pipe",
    ],
    advantages: [
      "Real-time patient video visualization of vocal cords",
      "Bloodless Coblation temperature technology reduces postoperative pain",
      "Fast vocal rehabilitation for singers, teachers, and professionals",
      "Outpatient diagnostic clearance in minutes",
    ]
  },
  {
    id: "pediatric-ent",
    title: "Pediatric ENT",
    shortDesc: "Gentle, specialized ENT care for infants and children: adenoids, tonsils, and glue ear.",
    fullDesc: "Children require special care and instrumentation designed specifically for delicate pediatric anatomies. Dr. Akhil Sareen specializes in pediatric ENT conditions such as snoring, mouth breathing, recurrent ear infections, speech delays due to hearing loss, and enlarged adenoids.",
    iconName: "pediatric",
    image: "/images/clinic-3.jpg",
    equipmentUsed: "Ultra-slim Pediatric Karl Storz Endoscopes & Coblation Wand",
    procedures: [
      "Coblation Adenoidectomy for Snoring & Mouth Breathing",
      "Stitchless Tonsillectomy for Recurrent Infections",
      "Myringotomy & Grommet Insertion for Glue Ear / Serous Otitis",
      "Pediatric Hearing Screening & Assessment",
      "Tongue Tie (Ankyloglossia) Release",
      "Pediatric Foreign Body Removal (Ears / Nose)",
    ],
    advantages: [
      "Child-friendly ambience to alleviate doctor anxiety",
      "Coblation allows virtually pain-free recovery with normal diet resumed in 24 hours",
      "Elimination of sleep apnea helps physical and cognitive growth",
      "High parental satisfaction with close post-op follow-ups",
    ]
  },
  {
    id: "audiometry-hearing",
    title: "Audiometry & Hearing",
    shortDesc: "Computerized hearing tests, PTA, Impedance Audiometry, and digital hearing aid fitting.",
    fullDesc: "Our dedicated audiology section features a calibrated sound-treated booth and advanced diagnostic audiometers to accurately diagnose conductive, sensorineural, and mixed hearing loss across all age groups. We provide certified pure tone audiometry and digital hearing aid consultation.",
    iconName: "audiometry",
    image: "/images/audiometry.jpg",
    equipmentUsed: "Computerized Dual-Channel Diagnostic Audiometer & Tympanometer",
    procedures: [
      "Pure Tone Audiometry (PTA) Air & Bone Conduction",
      "Impedance Audiometry / Tympanometry (Middle Ear Pressure)",
      "Speech Reception Threshold & Discrimination Testing",
      "Digital Hearing Aid Trial, Programming & Dispensing",
      "Tinnitus Frequency Matching & Sound Therapy",
      "Noise-induced Hearing Loss Assessment",
    ],
    advantages: [
      "Strict acoustic calibration in soundproof test environment",
      "Accurate decibel assessment from mild to profound hearing loss",
      "Objective middle ear evaluation in under 5 minutes",
      "Invisible in-the-canal (CIC) and rechargeable hearing aids",
    ]
  },
  {
    id: "head-neck-cancer",
    title: "Head & Neck Cancer",
    shortDesc: "Surgical oncology for mouth, tongue, throat, larynx, thyroid, and salivary glands.",
    fullDesc: "Led by Dr. Akhil Sareen, fellowship-trained in Head & Neck Surgical Oncology (FOHNS), our centre is recognized as a regional referral hub in Eastern UP for early detection and comprehensive surgical management of head and neck cancers with organ-preservation protocols.",
    iconName: "cancer",
    image: "/images/zeiss-microscope.jpg",
    equipmentUsed: "Zeiss Surgical Microscope, High-Frequency Electrosurgery & Endoscopic Tower",
    procedures: [
      "Oral Cancer Resection (Tongue, Buccal Mucosa, Jaw)",
      "Neck Dissection (Lymph Node Clearance)",
      "Laryngeal & Hypopharyngeal Cancer Surgery",
      "Thyroidectomy for Benign & Malignant Thyroid Nodules",
      "Parotid & Submandibular Salivary Gland Surgery (Facial Nerve Preservation)",
      "Pre-cancerous Lesion (Leukoplakia, Erythroplakia) Biopsy & Excision",
    ],
    advantages: [
      "Multi-disciplinary surgical precision targeting complete margins",
      "Meticulous preservation of vital nerves (facial, recurrent laryngeal)",
      "Reconstructive flap techniques for cosmetic and functional restoration",
      "Close post-operative surveillance and rehabilitation support",
    ]
  }
];

export const CLINIC_STATS: ClinicStat[] = [
  {
    value: "50K+",
    label: "Patients Treated",
    sublabel: "Satisfied individuals & families",
    icon: "patients"
  },
  {
    value: "15+",
    label: "Years of Experience",
    sublabel: "Dedicated surgical excellence",
    icon: "experience"
  },
  {
    value: "10K+",
    label: "Surgeries Conducted",
    sublabel: "High precision success rate",
    icon: "surgeries"
  },
  {
    value: "40K+",
    label: "Endoscopies Done",
    sublabel: "Storz HD video diagnostics",
    icon: "doctors"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Vikash Pandey",
    date: "Varanasi",
    rating: 5,
    treatment: "Endoscopic Sinus Surgery (FESS)",
    comment: "Best service and very supporting staff! Dr. Akhil Sareen took time to understand my chronic sinusitis issue that I suffered from for 4 years. The surgery was smooth, painless, and I was discharged the same evening. Highly recommended!",
    avatarText: "VP"
  },
  {
    id: "t2",
    name: "Richa Kumari",
    date: "Lanka, Varanasi",
    rating: 5,
    treatment: "Zeiss Microscopic Ear Surgery",
    comment: "Dr. Sareen is extremely polite, humble, and thoroughly explained the whole eardrum repair procedure. The clinic is equipped with German Zeiss equipment and very clean. My hearing has restored completely without any complications.",
    avatarText: "RK"
  },
  {
    id: "t3",
    name: "Ajay Kumar Maurya",
    date: "Chandauli / Varanasi",
    rating: 5,
    treatment: "Voice & Throat Care",
    comment: "Excellent doctor with deep knowledge. I had severe hoarseness in voice for months. The video laryngoscopy immediately pinpointed vocal cord polyp which was cured with precision. Minimal waiting time and genuine care.",
    avatarText: "AM"
  },
  {
    id: "t4",
    name: "Yashraj Sonker",
    date: "BHU, Varanasi",
    rating: 5,
    treatment: "Pediatric Adenoids Treatment",
    comment: "We brought our 6-year-old son who had severe mouth breathing and snoring at night. Dr. Sareen was so gentle with him. The Coblation procedure was completely stitchless and our son slept peacefully from day one.",
    avatarText: "YS"
  },
  {
    id: "t5",
    name: "Sidheshwar Singh",
    date: "Mirzapur / Varanasi",
    rating: 5,
    treatment: "Head & Neck Consultation",
    comment: "One of the best Head & Neck Oncosurgeons in Purvanchal. Clear diagnosis, no unnecessary tests, and genuine medical advice. God bless Dr. Akhil Sareen and his team.",
    avatarText: "SS"
  }
];

export const CLINIC_EQUIPMENT: EquipmentItem[] = [
  {
    name: "Carl Zeiss Extaro 300 Microscope",
    origin: "Germany",
    role: "Microscopic Ear & Laryngeal Surgery",
    description: "Industry benchmark surgical microscope providing 40x magnification, integrated LED illumination, and fluorescence imaging for razor-sharp visualization of auditory ossicles and delicate eardrum structures.",
    image: "/images/zeiss-microscope.jpg"
  },
  {
    name: "Karl Storz Full HD Endoscopic Tower",
    origin: "Germany",
    role: "Sinus, Skull Base & Laryngoscopy",
    description: "High-definition optical endoscopy platform delivering crystal-clear visualization into narrow sinus pathways, nasal passages, and the vocal cords for accurate diagnostic biopsies and scar-free procedures.",
    image: "/images/clinic-1.jpg"
  },
  {
    name: "Smith & Nephew Coblator II System",
    origin: "USA",
    role: "Bloodless & Stitchless Coblation Surgery",
    description: "Low-temperature radiofrequency plasma technology that dissolves tissue at 40°C–70°C rather than burning it like electrocautery, resulting in near-zero bleeding, dramatically reduced pain, and same-day discharge.",
    image: "/images/stitchless-surgery.png"
  },
  {
    name: "Computerized Soundproof Audiometry Suite",
    origin: "International Standard",
    role: "Pure Tone & Impedance Audiometry",
    description: "Certified sound-attenuated acoustic booth paired with digital audiometric hardware for definitive assessment of air-bone gaps, speech thresholds, and middle ear compliance across pediatric and geriatric patients.",
    image: "/images/audiometry.jpg"
  }
];

export const CLINIC_FAQS: FaqItem[] = [
  {
    category: "OPD & Timings",
    question: "What are the OPD consultation timings at Sareen's ENT Centre?",
    answer: "Our OPD is open Monday through Saturday in two shifts: Morning from 9:00 AM to 12:00 PM and Evening from 5:00 PM to 7:00 PM. The clinic is closed on Sundays. Prior appointments are recommended to ensure minimal waiting times."
  },
  {
    category: "Location",
    question: "Where is the clinic located in Varanasi?",
    answer: "The clinic is centrally located at Flat no B1, S.K. Gupta Colony, behind V2 Mall, next to Chandra Eye Care, Rashmi Nagar Colony, Lanka, Varanasi – approximately 200 meters from the famous BHU (Banaras Hindu University) main gate."
  },
  {
    category: "Surgery & Procedures",
    question: "What is Coblation surgery and how does it benefit tonsil and adenoid patients?",
    answer: "Coblation (Cold Ablation) is a breakthrough US technology utilizing radiofrequency energy and saline to gently dissolve tissue at low temperatures (40-70°C) instead of burning. This means near-zero bleeding, significantly less post-operative pain, and faster recovery—often enabling children to eat normal food within 24 hours."
  },
  {
    category: "Surgery & Procedures",
    question: "Can ear surgery be done as a same-day discharge procedure?",
    answer: "Yes, many microscopic ear procedures (such as tympanoplasty for eardrum repair, stapedectomy, and grommet insertion) are routinely performed under local or monitored anesthesia with same-day discharge, allowing patients to recover comfortably in their own home."
  },
  {
    category: "Diagnostics",
    question: "Do you have in-house hearing testing (audiometry) facilities?",
    answer: "Yes, our clinic has an in-house, calibrated soundproof testing chamber equipped for Pure Tone Audiometry (PTA), Impedance Audiometry (Tympanometry), and speech discrimination testing, along with digital hearing aid consultation and trial."
  },
  {
    category: "Mediclaim & Insurance",
    question: "Is Mediclaim / Cashless insurance facility available for surgeries?",
    answer: "Yes, we support documentation and coordination for medical insurance claims and reimbursement across major TPA and private health insurance providers for planned surgical procedures."
  }
];
