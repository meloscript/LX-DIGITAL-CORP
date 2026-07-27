export type Testimonial = {
  id: string;
  name: string;
  company: string;
  service: string;
  rating: number;
  quote: string;
  isPlaceholder: boolean;
};

/** Exemples temporaires — à remplacer par vos avis clients réels. */
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Marie L.",
    company: "Hôtel Riviera",
    service: "Référencement local",
    rating: 5,
    quote:
      "En trois mois, nos réservations directes ont nettement augmenté. L'équipe a structuré notre présence Google avec clarté et rigueur.",
    isPlaceholder: true,
  },
  {
    id: "2",
    name: "Thomas B.",
    company: "Clinique Santé+",
    service: "Création de sites web",
    rating: 5,
    quote:
      "Notre nouveau site inspire confiance dès la première visite. Les demandes de rendez-vous en ligne ont doublé.",
    isPlaceholder: true,
  },
  {
    id: "3",
    name: "Sophie M.",
    company: "Agence Horizon",
    service: "Automatisation",
    rating: 5,
    quote:
      "Les relances et la synchronisation CRM sont automatisées. Nous gagnons plusieurs heures par semaine sur l'administratif.",
    isPlaceholder: true,
  },
  {
    id: "4",
    name: "Karim D.",
    company: "Auto Prestige",
    service: "Marketing digital",
    rating: 5,
    quote:
      "Campagnes ciblées, reporting clair et leads plus qualifiés. Enfin une approche marketing orientée résultats.",
    isPlaceholder: true,
  },
];

export const reviewsSourceUrl: string | null = null;
/** Ex. "https://g.page/r/..." — lien Google Business Profile quand disponible */

export const reviewsSourceLabel = "Voir nos avis Google";
