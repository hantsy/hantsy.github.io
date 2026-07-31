import { Service, ProfileData } from '../services/profile.service';

export const profileData: Omit<ProfileData, 'bio'> = {
  name: 'Hantsy Bai',
  tagline: 'Independent Freelancer · Jakarta EE & Spring Expert · Open Source Contributor',
  availability: "I'm currently available for new projects and opportunities — feel free to reach out if you need help with application development, architecture consulting, or team coaching.",
  cvUrl: '/assets/pdf/cv.pdf',
  linkedinUrl: 'https://www.linkedin.com/in/hantsy',
  githubUrl: 'https://github.com/hantsy',
  services: [
    {
      icon: 'devices',
      title: 'Application Development',
      description: 'End-to-end development with Jakarta EE, Spring Boot, MicroProfile, Quarkus, and Angular — from prototype to cloud-native production.',
    },
    {
      icon: 'psychology',
      title: 'Consulting Services',
      description: 'Architecture review, code audits, tech stack selection, performance tuning, and hands-on mentoring to help your team ship better software.',
    },
  ] as Service[],
};
