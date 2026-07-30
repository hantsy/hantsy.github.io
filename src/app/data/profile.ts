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

I'm also an active blogger and open-source contributor. In 2012, I was honored to receive the JBoss Community Recognition Award from Red Hat (now part of IBM) at the JBoss User and Developer Conference in Boston.

I believe in remote-first work, engineering culture over endless meetings, continuous learning, and the freedom to manage my own time.`,

  availability: `I'm currently available for new projects and opportunities — feel free to reach out if you need help with application development, architecture consulting, or team coaching.`,

  services: [
    {
      icon: 'devices',
      title: 'Application Development',
      description:
        'Full-stack development across the entire Java ecosystem — Jakarta EE, Spring Boot, MicroProfile, Quarkus — and modern frontends with Angular. I take projects from concept to production, with clean code, solid testing, and cloud-native deployment.',
    },
    {
      icon: 'psychology',
      title: 'Consulting Services',
      description:
        'I help teams ship better software through architecture reviews, code audits, technology selection, and performance tuning. Whether you need a one-time deep dive or ongoing mentorship, I work alongside your engineers to raise the bar on code quality, agile practices, and engineering culture.',
    },
  ],

  githubUrl: 'https://github.com/hantsy',
  cvUrl: '/assets/pdf/cv.pdf',
  linkedinUrl: 'https://www.linkedin.com/in/hantsy',
};
