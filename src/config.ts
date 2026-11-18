// Public profile transcribed from ParkerHolzer_Resume.pdf, supplied November 18, 2026.
// Keep dated achievements dated; add only verified details. Never put secrets here.
export interface ResumeEntry {
  title: string;
  period: string;
  description: string;
  highlights?: string[];
}

export const site = {
  name: 'Parker Holzer',
  fullName: 'Parker Holzer, Ph.D.',
  initials: 'PH',
  role: 'Principal Data Scientist',
  location: 'Layton, Utah',
  title: 'Parker Holzer — Data science, AI & research',
  description: 'Parker Holzer, Ph.D. — principal data scientist working on agentic AI, production machine learning, and statistical research.',
  profileIsPlaceholder: false,
  tagline: 'Principal Data Scientist. Agentic AI, production machine learning, and a foundation in statistics.',
  introduction: 'I’m Parker Holzer, a data scientist with a Ph.D. from Yale. I build production AI systems and translate machine learning research into practical products.',
  biography: 'My work connects statistical research with production AI. I earned my Ph.D. in Data Science & Statistics at Yale University, where I studied exoplanet detection and collaborated on biomedical research with the Yale School of Medicine. Since then, I have developed AI agents, retrieval-augmented systems, and machine learning products at Spiff, Salesforce, and Reputation.com.',
  professionalInterests: 'My professional work spans agentic AI, retrieval-augmented generation, LLM evaluation, predictive modeling, and Bayesian statistics. I’m interested in turning rigorous methods into useful systems and helping teams bring those systems into production.',
  personal: 'Beyond the work, here’s a glimpse of life with my family.',
  photos: {
    portrait: { alt: 'Parker Holzer smiling in a casual portrait.' },
    family: { alt: 'Parker Holzer with his family outdoors.', caption: 'With my family.' },
  },
  email: 'holzerparker@gmail.com',
  socials: {
    github: '', // A personal profile URL was not included in the resume.
    linkedin: 'https://www.linkedin.com/in/parker-holzer-ph-d-417561a1/',
    scholar: 'https://scholar.google.com/citations?user=RqViEccAAAAJ&hl=en',
  },
  expertise: ['Agentic AI & LLMs', 'Production machine learning', 'Statistics & research', 'Technical leadership'],
  resume: {
    experience: [
      {
        title: 'Principal Data Scientist — Reputation.com',
        period: 'April 2025 – November 2026 · Remote',
        description: 'Architected and launched RepIQ, a production AI agent for reputation intelligence.',
        highlights: [
          'Used agentic RAG and LLM evaluation frameworks to deliver actionable intelligence to customers across 311 companies.',
          'Scaled adoption to 2,600+ frequent users, with low-latency responses and a negative-feedback rate below 0.05%.',
          'Mentored six data scientists and collaborated with seven software engineers. Led AI/ML experimentation to improve customer experience and operational efficiency.',
        ],
      },
      {
        title: 'Data Scientist — Salesforce',
        period: 'February 2024 – April 2025 · San Francisco, California',
        description: 'Developed AI agents for Salesforce’s Agentforce platform to automate commission calculations and organization.',
        highlights: [
          'Reduced time spent on commission calculations and organization by 86%.',
          'Collaborated with product, engineering, and finance teams to integrate AI-driven commission workflows into the platform.',
        ],
      },
      {
        title: 'Data Scientist — Spiff Inc. (acquired by Salesforce)',
        period: 'October 2021 – February 2024 · Sandy, Utah',
        description: 'Developed AI and machine learning systems for commission calculation and customer assistance.',
        highlights: [
          'Led a cross-functional team building an AI-powered commission calculation system, achieving 98% accuracy with sub-second response times.',
          'Developed an ensemble regression model in Python to predict sales representative attrition.',
          'Built a RAG-powered conversational assistant integrating platform documentation and customer commission data.',
          'Productionized an LLM workflow for interpreting complex, customer-defined commission formulas.',
        ],
      },
      {
        title: 'Data Science Intern — The ETC Group',
        period: 'May 2017 – August 2017 · Salt Lake City, Utah',
        description: 'Developed multivariate regression models on a collaborative team to help local companies reduce heating and cooling energy expenditures.',
      },
    ] as ResumeEntry[],
    education: [
      {
        title: 'Ph.D. in Data Science & Statistics — Yale University',
        period: 'August 2017 – December 2021 · New Haven, Connecticut',
        description: 'Doctoral research in statistical methods for exoplanet detection, with additional biomedical research collaborations.',
        highlights: [
          'Developed an algorithm using linear regression and Bayesian statistics to improve exoplanet detection accuracy by 15%.',
          'Defined the Stellar Activity F-statistic for Exoplanet surveys (SAFE) to help distinguish stellar activity from exoplanet signals.',
          'Published the open-source R package rvmethod, with 15,813 reported installations as of November 16, 2026.',
          'Applied generalized linear models, bootstrapping, and statistical hypothesis testing in collaboration with the Yale School of Medicine.',
        ],
      },
      {
        title: 'B.S. in Mathematics & B.S. in Applied Physics — University of Utah',
        period: 'August 2011 – May 2017 · Salt Lake City, Utah',
        description: 'Undergraduate degrees in mathematics and applied physics.',
      },
    ] as ResumeEntry[],
    skills: [
      'Generative AI & LLMs: agentic AI, retrieval-augmented generation (RAG), LLM fine-tuning, LLM evaluation, AI agents.',
      'Machine learning & statistics: ensemble methods, neural networks, predictive modeling, Bayesian statistics, regression, optimization.',
      'Programming & tools: Python, R, SQL, Scikit-learn, TensorFlow, Pandas.',
      'Leadership & product: technical leadership, cross-functional collaboration, AI product development, experimentation, production ML.',
    ],
    teaching: [
      {
        title: 'Data science mentorship — Reputation.com',
        period: 'April 2025 – November 2026',
        description: 'Mentored a team of six data scientists and collaborated with seven software engineers.',
      },
    ] as ResumeEntry[],
    awards: [
      { title: 'AI Utah 100', period: '2024 & 2026', description: 'Recognized as one of the top contributors to AI in Utah.' },
      { title: 'Best Overall Talk Award', period: 'August 2016', description: 'University of Utah Physics & Astronomy Research Symposium.' },
    ] as ResumeEntry[],
  },
};
export const navigation = [
  { href: '/', label: 'Home' }, { href: '/about/', label: 'About' },
  { href: '/resume/', label: 'Resume' }, { href: '/projects/', label: 'Projects' },
  { href: '/blog/', label: 'Blog' }, { href: '/publications/', label: 'Publications' },
  { href: '/contact/', label: 'Contact' },
];
export const categories = ['Artificial Intelligence', 'Statistics', 'Software Development', 'Mathematics', 'Science', 'Personal'];
