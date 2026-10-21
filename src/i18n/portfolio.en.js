import { experiences, projects, testimonials } from "../data/portfolio.js";

const skills = {
  "Architecture logicielle": "Software architecture",
  Conseil: "Consulting",
  "Développement Full-stack": "Full-stack development",
  "Gestion de projet IT": "IT project management",
  "Développement de logiciels": "Software development",
  IA: "AI",
  "Systèmes embarqués": "Embedded systems",
  "Informatique Affective": "Affective Computing",
  Santé: "Healthcare",
  "Traitement d'image": "Image processing",
  "Temps réel": "Real-time",
  Environnement: "Environment",
  SGBDR: "RDBMS",
};

const experienceCopy = {
  weldom: {
    period: "May 2026 - Present",
    role: "Software Engineer - IT Consulting & Full-stack Development",
    company: "Weldom (Freelance) - Breuil-le-Sec",
    description: [
      "Contributing to the evolution of a business application deployed in more than 300 stores.",
      "Designing and developing custom software solutions (web, mobile, APIs).",
      "Managing testing, acceptance testing and the operational maintenance of applications.",
      "Analysing and resolving incidents, fixing defects and implementing functional enhancements.",
    ],
  },
  independent: {
    period: "Jan 2026 - Present",
    role: "Software Engineer - IT Consulting & Development",
    company: "Freelance Consultant - France",
    description: [
      "Designing and developing custom software solutions (web, mobile, APIs, automation, AI).",
      "Defining scalable cloud architectures and deploying through Docker, CI/CD and servers.",
      "Building PoCs, MVPs and prototypes to quickly validate product ideas ➔ reducing timelines by several months.",
      "Supporting technical teams or managing entire projects from design to deployment.",
    ],
  },
  ontbo: {
    period: "Jan 2024 - Dec 2025",
    role: "Software Engineer - Full-stack, DevOps & AI R&D",
    company: "ONTBO - Compiègne",
    description: [
      "Developing applications integrating GenAI, data science and affective computing.",
      "Designing backends, REST APIs and user interfaces with Python, FastAPI, TypeScript, React/Vue.",
      "Setting up automated cloud deployment pipelines (Docker, CI/CD, AWS) ➔ more than 8 services deployed in under 5 minutes.",
      "Rapidly developing R&D prototypes ➔ short development cycles for innovative solutions.",
    ],
  },
  nightingale: {
    period: "Feb 2025 - Mar 2025",
    role: "Software Engineer - AI & Computer Vision",
    company: "Nightingale Project - Mainz, Germany",
    description: [
      "Implementing machine learning models for automatic 2D/3D wound detection.",
      "Processing and analysing a medical dataset ➔ more than 1,500 wound images from more than 450 patients.",
      "Designing real-time image analysis pipelines and extracting biomedical features.",
      "Deploying models through REST APIs and Docker containerisation ➔ 400% faster deployment, independent of the target environment.",
    ],
  },
  uteam: {
    period: "Jan 2020 - Dec 2023",
    role: "Software Developer - Consultant",
    company: "UTeam - Compiègne",
    description: [
      "Developing and maintaining full-stack business applications and embedded systems (C/C++, IoT, ROS).",
      "Contributing to several robotics and R&D projects.",
      "Analysing client requirements and providing technical support to startups, SMEs and laboratories ➔ more than 10 projects delivered.",
      "Contributing to software architecture and the adoption of sound engineering practices.",
    ],
  },
};

const projectCopy = {
  ontbo: {
    title: "ONTBO ✦ Memory and Context Layer for AI Agents",
    description:
      "By retaining and structuring information from previous exchanges, ONTBO enables AI agents to be more consistent, personalised and adaptive when interacting with users or performing complex tasks. I contributed to the full development of the tool, from its design to production deployment.",
  },
  nightingale: {
    title: "Nightingale Project ✦ 3D Wound Segmentation",
    description:
      "An applied research project on the automatic segmentation of war wounds from 3D scans. The system uses DeepSkin to detect wounds in 2D projections, then projects the results back onto the 3D model for interactive web visualisation. I contributed to this project in Germany during the R&D and iterative testing phase, integrating the DeepSkin model for real-time segmentation and designing and making the API available.",
  },
  lynxjs: {
    title: "LynxJS ✦ Cross-Platform Development",
    description:
      "A project aimed at making LynxJS compatible with cross-platform development (Web, Mobile and Desktop). Electron integration makes it possible to develop, deploy and test desktop applications with hot reload. The project provides a foundation for running LynxJS on the web while maintaining mobile compatibility, making development across environments easier with a single codebase.",
  },
  dragnreceive: {
    title: "DragN’Receive ✦ Click & Collect for Local Products",
    description:
      "Drag-n-Receive is a student project designed to demonstrate a Click & Collect system at an exhibition stand, covering an urban area and featuring only partners offering local products. This prototype was built as a proof of concept, demonstrating the technical feasibility and value of a digital service supporting the local economy and neighbourhood retailers.",
  },
};

const testimonialCopy = [
  {
    quote:
      "I had the opportunity to work with Pierre for several years, and it was a real pleasure! Pierre is rigorous in his technical approach, extremely independent and resourceful. The kind of person you can entrust with a task and be sure it will be carried out perfectly.",
    role: "CTO & Co-founder, ONTBO",
  },
  {
    quote:
      "Our industry is one where originality is essential to finding your place, and where technical expertise is everywhere. Pierre has been, and continues to be, our provider for the most demanding technical services. In particular, he is responsible for the technical implementation of our website, both frontend and backend. Independent, proactive and skilled, he has fully earned his engineering title. I can only recommend him for demanding technical roles where assignments must be carried out with rigour and precision.",
    role: "Founder, Fallen Order",
  },
  {
    quote:
      "Pierre made an important contribution to the Surgic Sense project during his one-month internship in spring 2025. He helped the developers create a web API and researched very important information on which we based much of our work. He had a very pleasant attitude and helped team members in many ways.",
    role: "Researcher & Director, Nightingale Project",
  },
  {
    quote:
      "In streaming, it is both difficult and rare to find people who can meet requests that go beyond the ordinary. I called on his services for the technical side of my streams (custom chatbox, website, etc.), and he has since become my go-to person whenever I need a professional with this level of expertise. Respectful of deadlines and able to understand all aspects of a project, Pierre consistently delivers work that meets the specification.",
    role: "Streamer / YouTuber",
  },
];

export const englishExperiences = experiences.map((item) => ({
  ...item,
  ...experienceCopy[item.id],
  technologies: item.technologies.map((skill) => skills[skill] ?? skill),
}));
export const englishProjects = projects.map((item) => ({
  ...item,
  ...projectCopy[item.id],
  tags: item.tags.map((skill) => skills[skill] ?? skill),
}));
// All English quotes are translations of the available French copy, including
// the Lane testimonial, whose original English wording has not been supplied.
export const englishTestimonials = testimonials.map((item, index) => ({
  ...item,
  ...testimonialCopy[index],
  traduce_from: "French version",
}));
