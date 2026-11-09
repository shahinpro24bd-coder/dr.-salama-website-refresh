/** Browser-only storage for the admin panel (no server needed). */

export type ContactInfo = {
  doctor: string;
  title: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  instagram: string;
  facebook: string;
};
export type Service = { id: string; name: string; description: string };
export type Faq = { id: string; question: string; answer: string };
export type AppointmentRequest = {
  id: string;
  name: string;
  phone: string;
  date: string;
  message: string;
  page: string;
  createdAt: number;
  read: boolean;
};
export type Account = { username: string; password: string };

export const KEYS = {
  contact: "site_admin_contact_v1",
  services: "site_admin_services_v1",
  faqs: "site_admin_faqs_v1",
  requests: "site_admin_requests_v1",
  account: "site_admin_account_v1",
} as const;

export const DEFAULT_CONTACT: ContactInfo = {
  doctor: "Dr. Husien Salama",
  title: "Dentist · Baghdad",
  phone: "+964 774 444 4992",
  whatsapp: "+964 774 444 4992",
  email: "",
  address: "14 Ramadan St., next to Royal Galaxy, Al-Asal Building, 3rd Floor — Al-Mansour, Baghdad",
  hours: "Daily 11:00 AM – 9:00 PM",
  instagram: "https://www.instagram.com/dr.husien.salama/",
  facebook: "",
};

const SERVICE_NAMES = [
  "Root Canal Treatment",
  "Root Canal Retreatment",
  "Saving Broken-Down Teeth",
  "IPS e.max Lab Restorations",
  "Deep Margin Elevation",
  "Broken Instrument Removal",
  "Fiber Post & Core",
  "Aesthetic Fillings",
  "Digital X-ray Diagnosis",
  "Emergency Toothache Relief",
];
export const DEFAULT_SERVICES: Service[] = SERVICE_NAMES.map((name, i) => ({
  id: `s${i + 1}`,
  name,
  description: "",
}));

export const DEFAULT_FAQS: Faq[] = [
  {
    id: "f1",
    question: "How do I book an appointment with Dr. Husien Salama?",
    answer: "Call 0774 444 4992 or 0784 444 4992, message us on WhatsApp, or fill in the appointment form. The clinic is open daily from 11:00 AM to 9:00 PM.",
  },
  {
    id: "f2",
    question: "What happens during the first consultation?",
    answer: "The doctor listens to your complaint, takes an x-ray and explains every option — saving your tooth always comes first.",
  },
  {
    id: "f3",
    question: "Can my tooth be saved instead of extracted?",
    answer: "Often, yes. With root canal treatment or retreatment, a fiber post and a lab-made restoration, many teeth scheduled for extraction can be saved.",
  },
];

export const DEFAULT_ACCOUNT: Account = { username: "admin", password: "admin123" };

export function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function save<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function newId() {
  return Math.random().toString(36).slice(2, 10);
}
