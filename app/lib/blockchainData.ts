// Static profile data for each blockchain block
// All content sourced from Tomáš Daniel's LinkedIn profile

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  duration: string;
  location: string;
  type: string;
  description: string;
  skills: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  period: string;
  skills: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface BlockContent {
  id: string;
  title: string;
  subtitle?: string;
  type: 'genesis' | 'experience' | 'skills' | 'education' | 'certifications' | 'projects' | 'contact';
  intro?: string;
  experiences?: ExperienceItem[];
  skillCategories?: SkillCategory[];
  education?: EducationItem[];
  placeholder?: string;
  links?: { label: string; url: string; icon: string }[];
}

export const profileInfo = {
  name: 'Tomáš Daniel',
  title: 'Software Developer | Cybersecurity',
  tagline: 'Building secure systems, one block at a time.',
  linkedin: 'https://www.linkedin.com/in/tomas-daniel-b71724197',
};

export const blockContents: BlockContent[] = [
  // GENESIS BLOCK — About Me / Intro
  {
    id: 'genesis',
    title: 'Genesis Block',
    subtitle: 'About Me',
    type: 'genesis',
    intro: `I'm a Software Developer with an extensive background in C++ and Python, currently channeling my engineering experience into the world of Cybersecurity.

🎯 Current Focus: I am pursuing my Master's degree in Cybersecurity at Brno University of Technology. Alongside my studies, I work at Thermo Fisher Scientific, where I focus on software security, enhancing SBOM pipelines, and implementing secure proxy solutions to safeguard internal projects.

💼 Professional Background: My journey started early. For over 6 years, I engineered high-performance C++ solutions in the telecommunications sector, collaborating with industry leaders like Atos, Unify, and Mitel. Recently, I've expanded my tech stack to develop Python-based cloud solutions. I thrive in collaborative environments and love tackling complex architectural challenges.

🏃 Off the Screen: When I'm not analyzing security pipelines or writing code, you'll find me on the tennis court or lifting in the gym — blending a love for tech with a healthy, active lifestyle.

🔮 Looking Ahead: I'm always eager to connect with fellow devs, security engineers, mentors, and tech enthusiasts. Feel free to reach out!`,
  },

  // BLOCK #1 — Experience
  {
    id: 'experience',
    title: 'Block #1',
    subtitle: 'Work Experience',
    type: 'experience',
    experiences: [
      {
        title: 'Software Developer',
        company: 'Analytical Instruments Group — Thermo Fisher Scientific',
        period: 'Sep 2025 – Apr 2026',
        duration: '8 months',
        location: 'Brno',
        type: 'Hybrid',
        description:
          'Software Developer Extern at Thermo Fisher Scientific, working on improving software security and development processes within the Analytical Instruments Group. Contributing to SBOM pipeline enhancements and helping safeguard internal projects by transitioning them to a secure NuGet proxy, reducing reliance on potentially compromised external feeds.',
        skills: ['Jenkins', 'SBOM', 'Software Security', 'NuGet'],
      },
      {
        title: 'C++ Software Developer',
        company: 'Atos / Unify / Gigaset / Mitel',
        period: 'Jul 2019 – Sep 2025',
        duration: '6 years 3 months',
        location: 'Brno',
        type: 'Hybrid',
        description:
          'As a C++ Developer in the telecommunications sector, I designed and implemented high-performance software solutions to enhance communication systems. My work involved developing and optimizing code, troubleshooting complex issues, and collaborating with teams to advance telecommunications technology. Collaborated with Atos, Unify, Gigaset, and Mitel.',
        skills: ['C++', 'Git', 'Telecommunications', 'Software Development'],
      },
      {
        title: 'Junior Python Software Developer',
        company: 'IXPERTA — #IXTRUST',
        period: 'Jun 2024 – Jan 2025',
        duration: '8 months',
        location: 'Brno',
        type: 'Hybrid',
        description:
          'Developed and maintained Python-based applications with a focus on cloud-related solutions. Role included coding, optimizing performance, and ensuring efficient integration with cloud technologies.',
        skills: ['Python', 'Flask', 'Cloud Technologies'],
      },
      {
        title: 'Bluetooth Devices Tester',
        company: 'IXPERTA',
        period: 'Jun 2018 – Jun 2019',
        duration: '1 year 1 month',
        location: 'On-site',
        type: 'On-site',
        description:
          'Responsible for evaluating and validating Bluetooth-enabled devices to ensure optimal performance, compatibility, and compliance with industry standards. Designed test plans, executed comprehensive tests, analyzed data, and troubleshot issues to deliver high-quality, reliable products.',
        skills: ['Bluetooth', 'Telecommunications', 'Quality Assurance'],
      },
      {
        title: 'IT Manager',
        company: 'ZŠ Jedovnice',
        period: 'Aug 2022 – Jan 2024',
        duration: '1 year 6 months',
        location: 'Jedovnice',
        type: 'On-site',
        description: 'IT manager at Czech elementary school. Managing IT infrastructure, hardware, and software systems for the school.',
        skills: ['IT Management', 'System Administration'],
      },
    ],
  },

  // BLOCK #2 — Skills & Technologies
  {
    id: 'skills',
    title: 'Block #2',
    subtitle: 'Skills & Technologies',
    type: 'skills',
    skillCategories: [
      {
        category: 'Languages',
        items: ['C++', 'Python', 'TypeScript', 'JavaScript', 'Bash'],
      },
      {
        category: 'Security',
        items: ['Cybersecurity', 'SBOM', 'Software Security', 'Network Security', 'Secure Proxy'],
      },
      {
        category: 'Frameworks & Tools',
        items: ['Flask', 'Jenkins', 'Git', 'NuGet', 'Docker'],
      },
      {
        category: 'Domains',
        items: ['Telecommunications', 'Cloud Solutions', 'Bluetooth', 'Network Communications'],
      },
      {
        category: 'Soft Skills',
        items: ['Team Collaboration', 'Problem Solving', 'Architecture Design', 'Mentoring'],
      },
    ],
  },

  // BLOCK #3 — Education
  {
    id: 'education',
    title: 'Block #3',
    subtitle: 'Education',
    type: 'education',
    education: [
      {
        institution: 'Brno University of Technology (VUT)',
        degree: "Master's degree",
        field: 'Cybersecurity',
        period: 'Jun 2025 – Jun 2027',
        skills: ['Network Communications', 'Cybersecurity'],
      },
      {
        institution: 'Brno University of Technology (VUT)',
        degree: "Bachelor's degree",
        field: 'Computer Science',
        period: 'Sep 2022 – Jun 2025',
        skills: ['Programming', 'Sport', 'Computer Science'],
      },
      {
        institution: 'Gymnázium, Brno, Vídeňská 47',
        degree: 'High School Diploma',
        field: 'Computer Science',
        period: 'Sep 2016 – Jun 2022',
        skills: [],
      },
    ],
  },

  // BLOCK #4 — Certifications
  {
    id: 'certifications',
    title: 'Block #4',
    subtitle: 'Certifications',
    type: 'certifications',
    placeholder: 'This block is currently being mined... Certification data will be added to the chain once validated by the network.',
  },

  // BLOCK #5 — Projects
  {
    id: 'projects',
    title: 'Block #5',
    subtitle: 'Projects',
    type: 'projects',
    placeholder: 'This block is currently being mined... Project data will be added to the chain once validated by the network.',
  },

  // BLOCK #6 — Contact / Connect
  {
    id: 'contact',
    title: 'Block #6',
    subtitle: 'Connect',
    type: 'contact',
    intro: "Want to add a new block to my chain? Let's connect and build something great together.",
    links: [
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/tomas-daniel-b71724197',
        icon: '🔗',
      },
    ],
  },
];
