import {
  MapPin,
  Monitor,
  TrendingUp,
  Bot,
  Workflow,
  BarChart,
  type LucideIcon,
} from "lucide-react";

export type ServiceSlug =
  | "referencement-local"
  | "creation-sites-web"
  | "marketing-digital"
  | "intelligence-artificielle"
  | "automatisation"
  | "analyse-performance";

export type ServiceData = {
  slug: ServiceSlug;
  id: string;
  icon: LucideIcon;
  title: string;
  shortDescription: string;
  cardDescription: string;
  color: string;
  metaTitle: string;
  metaDescription: string;
  promise: string;
  introduction: string;
  problems: string[];
  benefits: string[];
  method: { title: string; description: string }[];
  deliverables: string[];
  faq: { question: string; answer: string }[];
  highlights: string[];
};

export const services: ServiceData[] = [
  {
    slug: "referencement-local",
    id: "seo-local",
    icon: MapPin,
    title: "Référencement local",
    shortDescription: "Soyez visible quand vos clients vous cherchent.",
    cardDescription:
      "Apparaissez en tête des recherches locales et convertissez l'intention en demandes concrètes.",
    color: "from-premium to-blue-600",
    metaTitle: "Référencement local Google",
    metaDescription:
      "Optimisez votre visibilité locale sur Google. LX Digital Corp vous aide à attirer des clients prêts à acheter, près de chez vous.",
    promise:
      "Transformez les recherches locales en clients qualifiés, au moment où ils ont besoin de vous.",
    introduction:
      "Vos prospects comparent, lisent les avis et choisissent en quelques secondes. Nous structurons votre présence locale pour que votre entreprise soit la réponse évidente, au bon endroit et au bon moment.",
    problems: [
      "Vous n'apparaissez pas dans le pack local Google",
      "Vos concurrents captent les appels et les visites",
      "Vos avis en ligne ne reflètent pas la qualité de votre service",
      "Vous ne savez pas quels leviers locaux prioriser",
    ],
    benefits: [
      "Plus de visibilité sur les requêtes à forte intention",
      "Augmentation des appels, demandes et visites en point de vente",
      "Image de marque renforcée grâce à une e-réputation maîtrisée",
      "Pilotage clair des performances locales",
    ],
    method: [
      {
        title: "Audit de présence",
        description: "Analyse de votre fiche, de vos concurrents et de votre zone de chalandise.",
      },
      {
        title: "Optimisation ciblée",
        description: "Mise en conformité, contenus locaux et signaux de confiance.",
      },
      {
        title: "Suivi et amélioration",
        description: "Mesure des positions, des interactions et des conversions.",
      },
    ],
    deliverables: [
      "Optimisation Google Business Profile",
      "Stratégie de mots-clés locaux",
      "Gestion et réponses aux avis",
      "Rapports de performance mensuels",
    ],
    faq: [
      {
        question: "Combien de temps pour voir des résultats ?",
        answer:
          "Les premiers signaux apparaissent généralement en 4 à 8 semaines, selon la concurrence locale et l'état de départ.",
      },
      {
        question: "Travaillez-vous avec des entreprises multi-sites ?",
        answer:
          "Oui. Nous adaptons la stratégie à chaque établissement tout en conservant une cohérence de marque.",
      },
      {
        question: "Le référencement local suffit-il sans site web ?",
        answer:
          "Une fiche optimisée peut générer des contacts, mais un site professionnel renforce la conversion et la crédibilité.",
      },
    ],
    highlights: [
      "Optimisation Google Business Profile",
      "Gestion des avis et e-réputation",
      "Positionnement sur les recherches locales",
      "Suivi des performances et rapports clairs",
    ],
  },
  {
    slug: "creation-sites-web",
    id: "web",
    icon: Monitor,
    title: "Création de sites web",
    shortDescription: "Un site qui inspire confiance et convertit.",
    cardDescription:
      "Des sites rapides et premium, pensés pour transformer vos visiteurs en prospects qualifiés.",
    color: "from-slate-700 to-slate-900",
    metaTitle: "Création de sites web professionnels",
    metaDescription:
      "Sites web premium, rapides et orientés conversion. LX Digital Corp conçoit des expériences digitales qui renforcent votre crédibilité.",
    promise:
      "Un site web qui vend votre expertise avant même le premier échange.",
    introduction:
      "Votre site est souvent le premier contact avec vos futurs clients. Nous concevons des expériences claires, rapides et crédibles, avec un parcours pensé pour déclencher l'action.",
    problems: [
      "Site lent ou non adapté au mobile",
      "Message flou qui ne convertit pas",
      "Design daté qui nuit à votre crédibilité",
      "Absence de suivi des performances",
    ],
    benefits: [
      "Image professionnelle alignée avec votre positionnement",
      "Parcours utilisateur orienté prise de contact",
      "Base solide pour le référencement et le marketing",
      "Site performant, maintenable et évolutif",
    ],
    method: [
      {
        title: "Cadrage stratégique",
        description: "Objectifs, cibles, messages clés et structure de conversion.",
      },
      {
        title: "Design et développement",
        description: "Interface premium, contenus structurés et intégration technique.",
      },
      {
        title: "Mise en ligne et optimisation",
        description: "Tests, SEO technique et amélioration continue.",
      },
    ],
    deliverables: [
      "Maquettes et design responsive",
      "Développement Next.js performant",
      "Formulaires et appels à l'action optimisés",
      "Formation et documentation de prise en main",
    ],
    faq: [
      {
        question: "Proposez-vous la rédaction des contenus ?",
        answer:
          "Oui. Nous pouvons rédiger ou retravailler vos contenus pour un ton clair, professionnel et orienté conversion.",
      },
      {
        question: "Mon site sera-t-il rapide ?",
        answer:
          "La performance est un critère central : images optimisées, code léger et bonnes pratiques Core Web Vitals.",
      },
      {
        question: "Puis-je faire évoluer le site ensuite ?",
        answer:
          "Absolument. Nous construisons des bases propres pour ajouter pages, services ou fonctionnalités.",
      },
    ],
    highlights: [
      "Design premium adapté à votre marque",
      "Performance et compatibilité mobile",
      "Structure optimisée pour le référencement",
      "Parcours orienté conversion",
    ],
  },
  {
    slug: "marketing-digital",
    id: "marketing",
    icon: TrendingUp,
    title: "Marketing digital",
    shortDescription: "Attirez plus de prospects qualifiés.",
    cardDescription:
      "Des campagnes ciblées pour développer votre visibilité et votre pipeline commercial.",
    color: "from-emerald-500 to-teal-600",
    metaTitle: "Marketing digital orienté résultats",
    metaDescription:
      "Stratégies marketing digital performantes : contenus, publicité et génération de leads. LX Digital Corp accélère votre acquisition.",
    promise:
      "Des actions marketing mesurables qui alimentent votre croissance, mois après mois.",
    introduction:
      "Le marketing digital efficace ne repose pas sur le volume, mais sur la pertinence. Nous construisons des stratégies ciblées pour attirer les bons profils et maximiser votre retour sur investissement.",
    problems: [
      "Budget marketing sans retour mesurable",
      "Contenus publiés sans impact business",
      "Leads peu qualifiés ou irréguliers",
      "Absence de vision globale des canaux",
    ],
    benefits: [
      "Visibilité accrue auprès de votre cible",
      "Génération de leads plus prévisible",
      "Optimisation continue basée sur les données",
      "Alignement marketing / ventes",
    ],
    method: [
      {
        title: "Diagnostic et ciblage",
        description: "Analyse de l'audience, des canaux et des messages performants.",
      },
      {
        title: "Activation",
        description: "Campagnes, contenus et parcours de conversion.",
      },
      {
        title: "Optimisation",
        description: "Tests, ajustements et scaling des actions rentables.",
      },
    ],
    deliverables: [
      "Plan marketing trimestriel",
      "Campagnes publicitaires ciblées",
      "Calendrier éditorial et contenus",
      "Reporting des KPIs clés",
    ],
    faq: [
      {
        question: "Quels canaux utilisez-vous ?",
        answer:
          "Google Ads, Meta, LinkedIn, email et contenus organiques selon votre secteur et vos objectifs.",
      },
      {
        question: "Quel budget minimum recommandez-vous ?",
        answer:
          "Cela dépend du marché. Nous calibrons media et production pour un ROI réaliste dès le lancement.",
      },
      {
        question: "Pouvez-vous reprendre des campagnes existantes ?",
        answer:
          "Oui. Nous auditons l'existant et réallouons le budget vers ce qui performe.",
      },
    ],
    highlights: [
      "Stratégie social media et contenus",
      "Publicité en ligne ciblée",
      "Génération de leads qualifiés",
      "Analyse et optimisation continue",
    ],
  },
  {
    slug: "intelligence-artificielle",
    id: "ia",
    icon: Bot,
    title: "Intelligence artificielle",
    shortDescription: "Gagnez en efficacité avec l'IA.",
    cardDescription:
      "Automatisez les tâches répétitives et libérez du temps pour vos priorités stratégiques.",
    color: "from-accent to-purple-600",
    metaTitle: "Intelligence artificielle pour entreprises",
    metaDescription:
      "Intégrez l'IA dans vos processus : assistants, automatisation et analyse. LX Digital Corp rend l'IA concrète et utile.",
    promise:
      "L'IA au service de vos équipes, pas l'inverse : plus de productivité, moins de friction.",
    introduction:
      "L'intelligence artificielle devient un avantage compétitif lorsqu'elle est intégrée aux bons endroits. Nous identifions les cas d'usage à fort impact et déployons des solutions pragmatiques, sécurisées et mesurables.",
    problems: [
      "Tâches répétitives qui mobilisent vos équipes",
      "Données non exploitées",
      "Réponses clients trop lentes",
      "Incertitude sur les cas d'usage IA pertinents",
    ],
    benefits: [
      "Gain de temps sur les opérations courantes",
      "Meilleure réactivité client",
      "Décisions éclairées par vos données",
      "Avantage compétitif durable",
    ],
    method: [
      {
        title: "Cartographie des usages",
        description: "Identification des processus à automatiser ou augmenter.",
      },
      {
        title: "Prototype et déploiement",
        description: "Mise en place d'assistants, workflows et intégrations IA.",
      },
      {
        title: "Adoption et suivi",
        description: "Formation, mesure d'impact et amélioration continue.",
      },
    ],
    deliverables: [
      "Audit des opportunités IA",
      "Assistants et automatisations sur mesure",
      "Intégration avec vos outils existants",
      "Documentation et bonnes pratiques",
    ],
    faq: [
      {
        question: "Faut-il des compétences techniques en interne ?",
        answer:
          "Non. Nous concevons des solutions utilisables par vos équipes, avec un accompagnement à la prise en main.",
      },
      {
        question: "Mes données sont-elles protégées ?",
        answer:
          "La confidentialité est prioritaire. Nous choisissons des architectures adaptées à votre niveau de sensibilité.",
      },
      {
        question: "Par où commencer avec l'IA ?",
        answer:
          "Par un cas d'usage simple à fort ROI : qualification de leads, réponses FAQ, synthèse de données ou relances automatiques.",
      },
    ],
    highlights: [
      "Automatisation des tâches répétitives",
      "Assistants intelligents pour vos équipes",
      "Analyse et exploitation de vos données",
      "Solutions IA adaptées à votre activité",
    ],
  },
  {
    slug: "automatisation",
    id: "automation",
    icon: Workflow,
    title: "Automatisation",
    shortDescription: "Connectez vos outils, fluidifiez vos opérations.",
    cardDescription:
      "Reliez CRM, email, messagerie et analytics pour éliminer les tâches manuelles.",
    color: "from-blue-500 to-indigo-600",
    metaTitle: "Automatisation des processus digitaux",
    metaDescription:
      "Automatisez vos workflows : CRM, email, WhatsApp et analytics. LX Digital Corp simplifie vos opérations quotidiennes.",
    promise:
      "Des processus fluides, synchronisés et fiables — sans charge manuelle inutile.",
    introduction:
      "Chaque copier-coller, relance ou saisie manuelle coûte du temps et crée des erreurs. Nous connectons vos outils pour automatiser les flux qui freinent votre croissance.",
    problems: [
      "Données dispersées entre plusieurs outils",
      "Relances et suivis faits à la main",
      "Perte d'informations entre les équipes",
      "Processus lents et peu traçables",
    ],
    benefits: [
      "Opérations plus rapides et fiables",
      "Meilleure expérience client",
      "Visibilité en temps réel sur l'activité",
      "Équipes concentrées sur la valeur ajoutée",
    ],
    method: [
      {
        title: "Cartographie des flux",
        description: "Analyse des parcours actuels et des points de friction.",
      },
      {
        title: "Conception des workflows",
        description: "Scénarios automatisés entre vos outils métier.",
      },
      {
        title: "Déploiement et monitoring",
        description: "Tests, mise en production et suivi des performances.",
      },
    ],
    deliverables: [
      "Intégration CRM, email et messagerie",
      "Workflows automatisés sur mesure",
      "Synchronisation multi-outils",
      "Tableau de bord de suivi",
    ],
    faq: [
      {
        question: "Avec quels outils travaillez-vous ?",
        answer:
          "HubSpot, Pipedrive, Zoho, Google Workspace, WhatsApp Business, Zapier, Make et APIs sur mesure.",
      },
      {
        question: "L'automatisation remplace-t-elle mes équipes ?",
        answer:
          "Non. Elle leur fait gagner du temps en supprimant les tâches répétitives à faible valeur.",
      },
      {
        question: "Que se passe-t-il si un outil change ?",
        answer:
          "Nous documentons les workflows et pouvons les adapter lors de vos évolutions technologiques.",
      },
    ],
    highlights: [
      "Intégration CRM, email et messagerie",
      "Workflows automatisés sur mesure",
      "Synchronisation de vos outils",
      "Gain de temps opérationnel mesurable",
    ],
  },
  {
    slug: "analyse-performance",
    id: "analytics",
    icon: BarChart,
    title: "Analyse de performance",
    shortDescription: "Pilotez votre croissance avec des données claires.",
    cardDescription:
      "Des tableaux de bord utiles pour décider vite et investir au bon endroit.",
    color: "from-amber-500 to-orange-600",
    metaTitle: "Analyse de performance digitale",
    metaDescription:
      "Tableaux de bord, KPIs et recommandations actionnables. LX Digital Corp transforme vos données en décisions.",
    promise:
      "Des indicateurs lisibles pour savoir ce qui fonctionne — et agir sans attendre.",
    introduction:
      "Sans mesure, impossible d'optimiser. Nous structurons vos données marketing et commerciales en tableaux de bord clairs, pour piloter votre croissance avec confiance.",
    problems: [
      "Données éparpillées et difficiles à lire",
      "Décisions basées sur l'intuition",
      "Impossible de relier marketing et ventes",
      "Rapports trop techniques ou incomplets",
    ],
    benefits: [
      "Vision consolidée de la performance",
      "Identification rapide des leviers rentables",
      "Décisions plus rapides et argumentées",
      "Optimisation continue des investissements",
    ],
    method: [
      {
        title: "Collecte et structuration",
        description: "Connexion des sources et définition des KPIs essentiels.",
      },
      {
        title: "Visualisation",
        description: "Tableaux de bord adaptés à chaque profil (direction, marketing, ventes).",
      },
      {
        title: "Recommandations",
        description: "Analyse régulière et plan d'actions priorisé.",
      },
    ],
    deliverables: [
      "Tableaux de bord sur mesure",
      "Suivi des KPIs essentiels",
      "Rapports mensuels commentés",
      "Recommandations d'optimisation",
    ],
    faq: [
      {
        question: "Quels indicateurs suivez-vous ?",
        answer:
          "Trafic, leads, taux de conversion, coût d'acquisition, ROI campagnes et performance commerciale selon votre modèle.",
      },
      {
        question: "Utilisez-vous Google Analytics ?",
        answer:
          "Oui, ainsi que GA4, Search Console, Meta, CRM et outils métier selon votre stack.",
      },
      {
        question: "À quelle fréquence recevons-nous les rapports ?",
        answer:
          "Généralement chaque mois, avec un accès en temps réel aux tableaux de bord.",
      },
    ],
    highlights: [
      "Tableaux de bord clairs et utiles",
      "Suivi des KPIs essentiels",
      "Recommandations basées sur les données",
      "Rapports réguliers et compréhensibles",
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): ServiceSlug[] {
  return services.map((s) => s.slug);
}

export const serviceRoutes = Object.fromEntries(
  services.map((s) => [s.id, `/services/${s.slug}`])
) as Record<string, string>;
