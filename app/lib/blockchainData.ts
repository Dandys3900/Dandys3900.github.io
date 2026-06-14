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
  logo?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  issued: string;
  credentialId?: string;
}

export interface ProjectItem {
  title: string;
  institution: string;
  description: string;
  skills: string[];
  githubUrl?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface CertificationsItem {
  title: string;
  issueDate: string;
  skills: string[];
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
  certifications?: CertificationItem[];
  projects?: ProjectItem[];
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
        skills: ['Jenkins', 'SBOM', 'Python', 'Software Security', 'NuGet', 'Automation', 'CI/CD', 'Groovy language'],
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
        skills: ['C++', 'Git', 'Telecommunications', 'Software Development', 'Software Design', 'Agile', 'JIRA'],
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
        skills: ['Python', 'Flask', 'Cloud Technologies', 'Automation'],
      },
      {
        title: 'Bluetooth Devices Tester',
        company: 'IXPERTA',
        period: 'Jun 2018 – Jun 2019',
        duration: '1 year 1 month',
        location: 'On-site',
        type: 'On-site',
        description:
          'Responsible for evaluating and validating Bluetooth-enabled devices to ensure optimal performance, compatibility, and compliance with industry standards. Designed test plans, executed comprehensive tests, analyzed data, and troubleshot issues to deliver high-quality, reliable products in addition with certification documents issued for companies like Jabra, Plantronics, Sennheiser and others.',
        skills: ['Bluetooth', 'Telecommunications', 'Quality Assurance', 'Testing', 'Certification Documents'],
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
        items: ['C++', 'Python', 'TypeScript', 'JavaScript', 'Solidity', 'Bash', 'C', 'Rust', 'Haskell'],
      },
      {
        category: 'Security',
        items: ['Cybersecurity', 'SBOM', 'Software Security', 'Network Security', 'Secure Proxy'],
      },
      {
        category: 'Frameworks & Tools',
        items: ['Flask', 'Jenkins', 'Git', 'NuGet', 'Docker', 'React', 'Next.js', 'Tailwind CSS', 'Foundry'],
      },
      {
        category: 'Domains',
        items: ['Telecommunications', 'Cloud Solutions', 'Bluetooth', 'Network Communications', 'Web3', 'Smart Contracts', 'Blockchain', 'Security', 'Object-Oriented Programming'],
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
        logo: '/FIT.svg',
      },
      {
        institution: 'Brno University of Technology (VUT)',
        degree: "Bachelor's degree",
        field: 'Computer Science',
        period: 'Sep 2022 – Jun 2025',
        skills: ['Programming', 'Sport', 'Computer Science'],
        logo: '/FIT.svg',
      },
      {
        institution: 'Gymnázium, Brno, Vídeňská 47',
        degree: 'High School Diploma',
        field: 'Computer Science',
        period: 'Sep 2016 – Jun 2022',
        skills: [],
        logo: '/GVID.jpeg',
      },
    ],
  },

  // BLOCK #4 — Certifications
  {
    id: 'certifications',
    title: 'Block #4',
    subtitle: 'Certifications',
    type: 'certifications',
    certifications: [
      {
        name: 'C++ Intermediate',
        issuer: 'Sololearn',
        issued: 'Jan 2026',
        credentialId: 'CC-GWO7BBTW',
      },
      {
        name: 'JavaScript Course',
        issuer: 'Sololearn',
        issued: 'Oct 2021',
        credentialId: '18074789-1024',
      },
      {
        name: 'Python Core Course',
        issuer: 'Sololearn',
        issued: 'Aug 2021',
        credentialId: '18074789-1073',
      },
      {
        name: 'SQL Course',
        issuer: 'Sololearn',
        issued: 'Aug 2021',
        credentialId: '18074789-1060',
      },
      {
        name: 'Responsive Web Design Course',
        issuer: 'Sololearn',
        issued: 'Aug 2021',
        credentialId: '#1162-18074789',
      },
      {
        name: 'C# Course',
        issuer: 'Sololearn',
        issued: 'Aug 2021',
        credentialId: '18074789-1080',
      },
      {
        name: 'Machine Learning Course',
        issuer: 'Sololearn',
        issued: 'Aug 2021',
        credentialId: '18074789-1094',
      },
      {
        name: 'C++ Course',
        issuer: 'Sololearn',
        issued: 'Aug 2021',
        credentialId: '18074789-1051',
      },
      {
        name: 'JAVA Course',
        issuer: 'Sololearn',
        issued: 'Aug 2021',
        credentialId: '18074789-1068',
      },
      {
        name: 'C Course',
        issuer: 'Sololearn',
        issued: 'Aug 2021',
        credentialId: '#1089-18074789',
      },
      {
        name: 'GO Course',
        issuer: 'Sololearn',
        issued: 'Aug 2021',
        credentialId: '18074789-1164',
      },
      {
        name: 'C++ Tutorial Course',
        issuer: 'Sololearn',
        issued: 'Apr 2020',
        credentialId: '#1051-18074789',
      },
    ],
  },

  // BLOCK #5 — Projects
  {
    id: 'projects',
    title: 'Block #5',
    subtitle: 'Projects',
    type: 'projects',
    projects: [
      {
        title: '[BACHELOR THESIS] Graph-Based Explorer for Ethereum Address Clusters',
        institution: 'Brno University of Technology',
        description: 'This project delivers a modern, user-friendly web application that enables exploration of Ethereum address clusters stored in a graph database (NebulaGraph). These clusters are built using real-life heuristics applied to raw blockchain data. The backend processes and parses Ethereum blockchain data, constructs address relationships, and stores them efficiently in the graph database. The frontend provides an intuitive interface for users to search, navigate, and visualize the clusters and connections. The system bridges raw blockchain data and practical analysis by offering insight into on-chain address relationships through a scalable, interactive platform.\n\nTo the best of current knowledge, this is one of the very few—if not the only—publicly available tools that combines graph database technology with a real-time, web-accessible interface for Ethereum address clustering. This makes the application a unique contribution to blockchain analysis and visualization, offering powerful insights not easily accessible through traditional blockchain explorers.',
        skills: ['Ethereum blockchain', 'Graph database', 'Python', 'FastAPI', 'NebulaGraph', 'Clustering heuristics', 'Full stack application'],
        githubUrl: 'https://github.com/Dandys3900/Ethereum-Clustering',
      },
      {
        title: 'Modified ERC20 Token – Full-Stack dApp Implementation',
        institution: 'Vysoké učení technické v Brně',
        description: 'Full-stack decentralized application (dApp) centered around a customized ERC20 smart contract named Dandys Token. The frontend provides a modern, responsive user interface built with the Next.js framework and Tailwind CSS. It allows users to seamlessly connect their MetaMask wallets to interact with the blockchain, featuring real-time data visualization of daily token purchases and Ethereum consumption using Recharts and a Firebase database.\n\nThe backend logic is powered by a robust smart contract written in Solidity, leveraging OpenZeppelin libraries such as ERC20, EnumerableSet, and ECDSA to ensure secure development. I designed a complex role-based access control system that manages dedicated permissions for token minting, transferring, and identity administration. To carefully control token distribution, the contract enforces strict, algorithmically calculated daily limits on both global minting and individual transferring operations.\n\nA key feature of this project is the decentralized identity verification (IDP) mechanism, which validates signed messages from trusted authorities and grants users a 24-hour verified status. Additionally, the platform includes an on-chain voting system that enables users to propose and execute role changes within the ecosystem. I ensured the application\'s security and stability by conducting rigorous backend testing with the Foundry framework—including complex fuzz testing—and comprehensive frontend end-to-end testing using Playwright.',
        skills: ['Solidity', 'Next.js', 'DApps'],
        githubUrl: 'https://github.com/Dandys3900/BDA-Project',
      },
      {
        title: 'Swift Subset Compiler – Full Pipeline Implementation',
        institution: 'Brno University of Technology',
        description: 'Team leader in a project to develop a full scale compiler for a subset of the Swift language, implementing all key stages of compilation. Built in C, the compiler features token parsing, lexical analysis, syntax and semantic checking, and ultimately machine-like code generation. Designed an efficient pipeline ensuring accurate translation from high-level Swift subset to low-level executable instructions. This project demonstrates deep knowledge of compilers, language processing, and code generation.',
        skills: ['C (Programming Language)', 'Swift', 'Compiler', 'Lexical analysis', 'Syntax analysis', 'Semantic analysis', 'Code generation'],
        githubUrl: 'https://github.com/BonnyAD9/ifj23',
      },
      {
        title: 'Animal Shelter Information System – Team Lead',
        institution: 'Brno University of Technology',
        description: 'Led a team in designing and developing a comprehensive information system for an animal shelter. Responsible for database schema design and implementation, followed by building the full UI and backend using the Django framework. Integrated MySQL for data storage and utilized Bootstrap for a responsive and user-friendly design. Implemented user management with multiple roles (vet, volunteer, caretaker), secure logins, and interactive forms/views for efficient shelter operations.',
        skills: ['Django', 'Python', 'MySQL', 'User management'],
        githubUrl: 'https://github.com/Dandys3900/IIS-Project',
      },
      {
        title: 'C++ Crypto Price Prediction Simulation',
        institution: 'Brno University of Technology',
        description: 'Created a C++ simulation using SIMLIB to model the price predictions of fictional cryptocurrencies influenced by various actors such as miners, government, traders, and exchanges. Designed the system with an object-oriented approach, capturing the complex relationships between these entities, resulting in dynamic and realistic price fluctuations. The simulation’s core strength lies in its customizable JSON configuration, allowing users to dynamically add multiple actors, coins, and attributes for flexible experimentation. The project includes comprehensive documentation and validation experiments to verify the accuracy and reliability of the model.',
        skills: ['C++', 'SIMLIB', 'JSON', 'Simulation', 'Crypto'],
        githubUrl: 'https://github.com/Dandys3900/IMS',
      },
      {
        title: 'Custom Network Communication Client in C++',
        institution: 'Brno University of Technology',
        description: 'Designed and implemented a network communication client capable of receiving, processing, and sending messages using a custom protocol. Developed in C++, leveraging object-oriented programming (OOP) principles for scalability and efficiency. To ensure robust functionality, created mock servers in Python for testing and validation. Additionally, authored a comprehensive technical paper detailing the system architecture, implementation and basic theory behind it.',
        skills: ['C++', 'Socket programming', 'Network communication', 'Python'],
        githubUrl: 'https://github.com/Dandys3900/IPK-1.Project',
      },
      {
        title: 'ERC-20 Crypto Token & Web Integration',
        institution: 'Gymnázium, Brno, Vídeňská 47',
        description: 'Developed a custom cryptocurrency token using Solidity and ERC-20 standards on the Ethereum blockchain. Built and tested the smart contract in Truffle, then deployed it on the Rinkeby test network. Designed a user-friendly web interface using HTML, JavaScript, and Bootstrap, enabling users to buy tokens seamlessly. Integrated MetaMask for secure transactions, ensuring a smooth and decentralized experience.',
        skills: ['Solidity', 'Smart contracts', 'ERC-20', 'Web3', 'MetaMask', 'Ethereum blockchain'],
        githubUrl: 'https://github.com/Dandys3900/Dandys3900.github.io',
      },
      {
        title: 'Full-Stack Relational Database Design & SQL Scripting',
        institution: 'Brno University of Technology',
        description: 'Designed a comprehensive relational database schema from scratch based on a given specification. Developed a full SQL script to create all necessary entities, populate the database with test data, and implement advanced database functionalities. Demonstrated key SQL concepts, including triggers, complex SELECT queries (EXISTS, IN, WITH-CASE), stored procedures, materialized views, and indexing, ensuring optimized performance and data integrity.',
        skills: ['Database scheme design', 'SQL', 'ER Diagram'],
        githubUrl: 'https://github.com/Dandys3900/IDS-Project',
      },
      {
        title: 'Multi-Client Chat Server with Custom Protocol (C++)',
        institution: 'Brno University of Technology',
        description: 'Developed a fully functional network communication system, implementing both client and server-side components in C++. Designed the server to support multiple clients using multi-threading and synchronization techniques like semaphores, enabling real-time message exchange. Implemented custom chat rooms, allowing users to dynamically create, join, and leave conversations. This project showcases skills in network programming, concurrency, and networking.',
        skills: ['C++', 'Semaphores', 'Multi-threading', 'Sockets'],
        githubUrl: 'https://github.com/Dandys3900/IPK-2.Project',
      },
      {
        title: 'Multi-Process Post Office Simulation in C',
        institution: 'Brno University of Technology',
        description: 'Developed a C-based simulation of a multi-process post office environment, adopting process synchronization using mutexes and semaphores. Simulated clerks serving customers, taking breaks when idle, and respecting post office operating hours. Managed shared memory between processes to ensure efficient communication. This project showcases expertise in concurrent programming, process synchronization, and inter-process communication (IPC).',
        skills: ['C (Programming Language)', 'IPC', 'Shared memory', 'Synchronization'],
        githubUrl: 'https://github.com/Dandys3900/IOS-Project-2',
      },
      {
        title: 'Network Traffic Analysis Tool (C++ & libpcap)',
        institution: 'Brno University of Technology',
        description: 'Developed a network traffic analysis tool in C++, nearly similar to NetFlow, to capture and analyze network flows in real-time. Utilized libpcap for efficient packet capturing and extraction of statistical insights on each flow. Designed a ncurses-based terminal UI to display real-time traffic metrics dynamically.',
        skills: ['C++', 'Libpcap'],
        githubUrl: 'https://github.com/Dandys3900/ISA-Project',
      },
      {
        title: 'QT Desktop App – Robot Movement Simulation',
        institution: 'Brno University of Technology',
        description: 'Developed a QT-based desktop application that simulates robot movements in an enclosed playground with collision detection and handling. Implemented features allowing users to add robots and obstacles, customize robot speed, design custom playground layouts, and export/import configurations. Built in C++, the application leverages object-oriented design and event-driven programming to provide an interactive and visually engaging simulation.',
        skills: ['C++', 'QT', 'Simulation', 'UI'],
        githubUrl: 'https://github.com/Dandys3900/ICP-Project',
      },
      {
        title: 'Shell Script for File Access Logging',
        institution: 'Brno University of Technology',
        description: 'Developed a Shell script for managing files, including opening, creating, and logging access records. Utilized POSIX notation and various command-line utilities such as sort, awk, and tail to process and display access history dynamically.',
        skills: ['Shell', 'POSIX', 'CLI', 'Scripting'],
        githubUrl: 'https://github.com/Dandys3900/IOS-Project-1',
      },
      {
        title: 'ECG Signal Analysis with Python',
        institution: 'Gymnázium, Brno, Vídeňská 47',
        description: 'Developed a Python script for analyzing real-live ECG (EKG) data, focusing on signal smoothing and peak detection to identify periodic heartbeats. Leveraged SciPy, NumPy, and Matplotlib to process raw biomedical signals, filter noise, and visualize key patterns in heart activity.',
        skills: ['Python', 'Signal processing', 'Data visualization', 'NumPy', 'SciPy', 'Matplotlib'],
        githubUrl: 'https://github.com/Dandys3900/EKG-Analyser',
      },
    ],
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
      {
        label: 'GitHub',
        url: 'https://github.com/Dandys3900',
        icon: '💻',
      },
      {
        label: 'Email',
        url: 'mailto:[EMAIL_ADDRESS]',
        icon: '📧',
      },
    ],
  },
];
