export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface ProfileData {
  name: string;
  tagline: string;
  bio: string;
  availability: string;
  services: Service[];
  githubUrl: string;
  cvUrl: string;
  linkedinUrl: string;
}

export const profileData: ProfileData = {
  name: 'Hantsy Bai',
  tagline: 'Independent Freelancer · Jakarta EE & Spring Expert · Open Source Contributor',
  bio: `I'm a passionate independent freelancer based in Guangzhou, China, with over 20 years of hands-on experience in software engineering. My work centers on the Java ecosystem — Jakarta EE, Spring, MicroProfile, Quarkus — and modern frontend technologies like Angular.

I'm also an active blogger, open-source contributor, and speaker. In 2020 alone, I contributed over 100,000 lines of open-source code on GitHub. In 2012, I was honored to receive the JBoss Community Recognition Award from Red Hat (now part of IBM) at the JBoss User and Developer Conference in Boston.

I believe in remote-first work, engineering culture over endless meetings, continuous learning, and the freedom to manage my own time.`,

  availability: `I'm currently available for new projects and opportunities — feel free to reach out if you need help with application development, architecture consulting, or team coaching.`,

  services: [
    {
      icon: 'devices',
      title: 'Application Development',
      description:
        'Full-stack development with Jakarta EE, Spring Boot, MicroProfile, Quarkus, Angular, and cloud-native technologies — from prototype to production.',
    },
    {
      icon: 'lightbulb',
      title: 'Technical Consulting',
      description:
        'Architecture review, code audits, technology selection, performance tuning, and migration strategy for enterprise Java applications.',
    },
    {
      icon: 'rocket_launch',
      title: 'Startup Team Coaching',
      description:
        'Agile coaching, engineering culture building, code review practices, and hands-on mentoring for early-stage development teams.',
    },
  ],

  githubUrl: 'https://github.com/hantsy',
  cvUrl: '/assets/pdf/cv.pdf',
  linkedinUrl: 'https://www.linkedin.com/in/hantsy',
};
