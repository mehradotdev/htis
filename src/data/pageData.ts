export interface Milestone {
  year: string;
  title: string;
  description: string;
  imageSrc: string;
}

export interface TeamMember {
  img: string;
  name: string;
  role: string;
  desc: string;
}

export function getMilestones(imageSrcs: string[]): Milestone[] {
  if (imageSrcs.length !== 9) {
    throw new Error(
      `getMilestones: Expected exactly 9 image sources for milestones, received ${imageSrcs.length}`,
    );
  }
  return [
    {
      year: '2003',
      title: 'Kickstarted',
      description:
        'HTIS was founded with a vision to revolutionize the telecommunications and IT services sector.',
      imageSrc: imageSrcs[0],
    },
    {
      year: '2004',
      title: 'First Venture',
      description:
        'Secured our first enterprise partnership, setting the standard for our commitment to excellence.',
      imageSrc: imageSrcs[1],
    },
    {
      year: '2005',
      title: 'Expansion',
      description:
        'Expanded operations across multiple regions, growing our team to meet increasing market demand.',
      imageSrc: imageSrcs[2],
    },
    {
      year: '2007',
      title: 'Diversified',
      description:
        'Introduced comprehensive manpower solutions to our portfolio, offering end-to-end support.',
      imageSrc: imageSrcs[3],
    },
    {
      year: '2012',
      title: 'Tech Leap',
      description:
        'Adopted cutting-edge enterprise technologies, enabling faster and more scalable service delivery.',
      imageSrc: imageSrcs[4],
    },
    {
      year: '2015',
      title: 'First Award',
      description:
        'Received our first major industry award for outstanding service and innovation in telecom.',
      imageSrc: imageSrcs[5],
    },
    {
      year: '2020',
      title: 'Resilience',
      description:
        'Successfully navigated global challenges, transitioning to robust remote operations.',
      imageSrc: imageSrcs[6],
    },
    {
      year: '2023',
      title: 'Alliances',
      description:
        'Forged key strategic alliances with global tech leaders, expanding our capabilities and reach.',
      imageSrc: imageSrcs[7],
    },
    {
      year: '2024',
      title: 'Next-Gen',
      description:
        'Pioneering AI-driven telecom and workforce solutions for the digital-first future.',
      imageSrc: imageSrcs[8],
    },
  ];
}

export function getTeamMembers(memberImgSrcs: string[]): TeamMember[] {
  if (memberImgSrcs.length !== 6) {
    throw new Error(
      `getTeamMembers: Expected exactly 6 image sources for team members, received ${memberImgSrcs.length}`,
    );
  }
  return [
    {
      img: memberImgSrcs[0],
      name: 'John Doe',
      role: 'Managing Director',
      desc: 'A visionary leader with over 20 years of experience driving enterprise growth and strategic transformation globally.',
    },
    {
      img: memberImgSrcs[1],
      name: 'Sarah Connor',
      role: 'Chief Executive Officer',
      desc: 'Passionate about culture, innovation, and guiding our company to new heights with resilient business models.',
    },
    {
      img: memberImgSrcs[2],
      name: 'Michael Ross',
      role: 'Chief Technology Officer',
      desc: "Pioneering cutting-edge technological solutions and scaling robust architectures for tomorrow's unique challenges.",
    },
    {
      img: memberImgSrcs[3],
      name: 'Emily Blunt',
      role: 'Head of Operations',
      desc: 'Ensuring seamless day-to-day operations and achieving operational excellence across all our diverse teams.',
    },
    {
      img: memberImgSrcs[4],
      name: 'David Miller',
      role: 'Lead Developer',
      desc: 'Crafting highly intuitive, user-centric products and software that redefine the boundaries of what is possible.',
    },
    {
      img: memberImgSrcs[5],
      name: 'Alice Clark',
      role: 'Product Manager',
      desc: 'Designing resilient, high-performance product pipelines crucial for solving complex real-world business problems.',
    },
  ];
}
