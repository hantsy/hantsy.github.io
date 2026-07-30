export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface ProfileData {
  name: string;
  bio: string;
  dreams: string[];
  availability: string;
  services: Service[];
  socials: SocialLink[];
  githubUrl: string;
  cvUrl: string;
  linkedinUrl: string;
}

export const profileData: ProfileData = {
  name: 'Hantsy Bai',
  bio: `Hi, my name is Hantsy, a passionate independent freelancer from China.
I have 20-year experience in software engineering, and I am mainly focusing on Java EE/Jakarta EE and Spring ecosystem.

I am also a blogger, twitter, and open-source contributor. In the past 2020, I have contributed over 100k lines of open-source codes via Github.

In 2012, I was invited to attend the JBoss User and Developer Conference in Boston and received the 2012 JBoss Community Recognition Awards by RedHat (now division of IBM).

Currently, I live in Guangzhou, China.`,
  dreams: [
    'Be able to work anywhere on the earth.',
    'Always be agile, build your own Agile/Scrum principle at your pace, not obey all rules from a Scrum Master course.',
    'Believe in engineering culture, no meetings, always use the professional collaboration tools to replace the tedious chat or video call.',
    'Advocate geek culture, embrace challenges in daily work and always try to update the latest tech stack and give a shot to the cutting-edge technologies.',
    'Emphasize on time management and self-management, flexible working time.',
  ],
  availability: 'I am available for new opportunities.',
  services: [
    {
      icon: '💻',
      title: 'Application Development',
      description:
        'Full-stack application development with Jakarta EE, Spring Boot, MicroProfile, Quarkus, Angular, and cloud-native technologies.',
    },
    {
      icon: '🎯',
      title: 'Technical Consulting',
      description:
        'Architecture review, code audits, technology selection, performance tuning, and migration strategies for enterprise Java applications.',
    },
    {
      icon: '🚀',
      title: 'Startup Team Coaching',
      description:
        'Agile coaching, engineering culture building, code review practices, and mentoring for startup development teams.',
    },
  ],
  socials: [
    { label: 'GitHub', url: 'https://github.com/hantsy', icon: 'github' },
    {
      label: 'Twitter',
      url: 'https://twitter.com/hantsy',
      icon: 'twitter',
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/hantsy',
      icon: 'linkedin',
    },
    { label: 'Medium', url: 'https://medium.com/@hantsy', icon: 'medium' },
    { label: 'RSS', url: '/feed.xml', icon: 'rss' },
  ],
  githubUrl: 'https://github.com/hantsy',
  cvUrl: '/assets/pdf/cv.pdf',
  linkedinUrl: 'https://www.linkedin.com/in/hantsy',
};
