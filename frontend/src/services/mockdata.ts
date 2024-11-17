import { PersonSearchResult } from '@backend/db-types';
import { Product, Repository } from '@backend/db-types';

const allResults: PersonSearchResult[] = [
  // Original entries
  {
    person: {
      id: 1,
      firstName: 'Veena',
      lastName: 'Kumar',
      email: 'veena.kumar@example.com',
      username: 'veena123',
      title: 'Software Engineer',
      phoneNumber: '+1-123-456-7890', // Updated to international format
      locationId: 1,
    },
    location: {
      id: 1,
      streetAddress: '123 Main St',
      secondaryAddress: 'Apt 4B',
      city: 'Asheville',
      region: 'NC',
      zipCode: '28801',
      country: 'USA',
    },
    projects: [
      {
        id: 1,
        name: 'Security Scanner',
        description: 'A project to scan for vulnerabilities',
        contactPersonId: 1,
      } as Product,
      {
        id: 2,
        name: 'Repo1',
        description: 'Repository for code',
        contactPersonId: 1,
      } as Repository,
    ],
  },
  {
    person: {
      id: 2,
      firstName: 'Lars',
      lastName: 'Müller',
      email: 'lars.muller@example.com',
      username: 'larsm',
      title: 'Security API Developer',
      phoneNumber: '+41 76 123 4567', // Swiss mobile number format
      locationId: 2,
    },
    location: {
      id: 2,
      streetAddress: '456 Mountain Rd',
      city: 'Lucerne',
      region: 'Lucerne',
      zipCode: '6003',
      country: 'Switzerland',
    },
    projects: [
      {
        id: 3,
        name: 'API Development',
        description: 'Developing APIs',
        contactPersonId: 2,
      } as Product,
    ],
  },
  {
    person: {
      id: 3,
      firstName: 'Santiago',
      lastName: 'Martinez',
      email: 'santiago.martinez@example.com',
      username: 'santi123',
      title: 'Frontend Developer',
      phoneNumber: '+34 612 345 678', // Spanish mobile number
      locationId: 3,
    },
    location: {
      id: 3,
      streetAddress: '789 Calle Mayor',
      city: 'Madrid',
      region: 'Madrid',
      zipCode: '28013',
      country: 'Spain',
    },
    projects: [
      {
        id: 4,
        name: 'UI Library',
        description: 'A library of UI components',
        contactPersonId: 3,
      } as Repository,
    ],
  },
  {
    person: {
      id: 4,
      firstName: 'Akira',
      lastName: 'Tanaka',
      email: 'akira.tanaka@example.jp',
      username: 'akira_t',
      title: 'Backend Engineer',
      phoneNumber: '+81 90-1234-5678', // Japanese mobile number
      locationId: 4,
    },
    location: {
      id: 4,
      streetAddress: '1-2-3 Shibuya',
      city: 'Tokyo',
      region: 'Tokyo',
      zipCode: '150-0002',
      country: 'Japan',
    },
    projects: [
      {
        id: 5,
        name: 'Database Optimization',
        description: 'Improving database performance',
        contactPersonId: 4,
      } as Product,
    ],
  },
  {
    person: {
      id: 5,
      firstName: 'Ling',
      lastName: 'Chen',
      email: 'ling.chen@example.cn',
      username: 'lingchen',
      title: 'Data Scientist',
      phoneNumber: '+86 138 1234 5678', // Chinese mobile number
      locationId: 5,
    },
    location: {
      id: 5,
      streetAddress: 'No. 88 Nanjing Road',
      city: 'Shanghai',
      region: 'Shanghai',
      zipCode: '200001',
      country: 'China',
    },
    projects: [
      {
        id: 6,
        name: 'Machine Learning Models',
        description: 'Developing ML models',
        contactPersonId: 5,
      } as Product,
    ],
  },
  {
    person: {
      id: 6,
      firstName: 'Maria',
      lastName: 'Rossi',
      email: 'maria.rossi@example.it',
      username: 'mrossi',
      title: 'DevOps Engineer',
      phoneNumber: '+39 347 1234567', // Italian mobile number
      locationId: 6,
    },
    location: {
      id: 6,
      streetAddress: 'Via Roma 10',
      city: 'Rome',
      region: 'Lazio',
      zipCode: '00100',
      country: 'Italy',
    },
    projects: [
      {
        id: 7,
        name: 'Infrastructure Automation',
        description: 'Automating infrastructure',
        contactPersonId: 6,
      } as Repository,
    ],
  },
  {
    person: {
      id: 7,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      username: 'johndoe',
      title: 'Project Manager',
      phoneNumber: '+44 7700 900123', // UK mobile number
      locationId: 7,
    },
    location: {
      id: 7,
      streetAddress: '10 Downing Street',
      city: 'London',
      region: 'Greater London',
      zipCode: 'SW1A 2AA',
      country: 'United Kingdom',
    },
    projects: [
      {
        id: 8,
        name: 'Project Alpha',
        description: 'An important project',
        contactPersonId: 7,
      } as Product,
    ],
  },
  {
    person: {
      id: 8,
      firstName: 'Olga',
      lastName: 'Ivanova',
      email: 'olga.ivanova@example.ru',
      username: 'olga_i',
      title: 'QA Engineer',
      phoneNumber: '+7 912 345-67-89', // Russian mobile number
      locationId: 8,
    },
    location: {
      id: 8,
      streetAddress: 'Prospekt Mira 12',
      city: 'Moscow',
      region: 'Moscow City',
      zipCode: '101000',
      country: 'Russia',
    },
    projects: [
      {
        id: 9,
        name: 'Testing Framework',
        description: 'Creating a testing framework',
        contactPersonId: 8,
      } as Repository,
    ],
  },
  // Expanded entries with edge cases
  // 1. Person without a location (locationId missing)
  {
    person: {
      id: 9,
      firstName: 'Alex',
      lastName: 'Smith',
      email: 'alex.smith@example.com',
      username: 'alexs',
      title: 'Engineer',
      // locationId is missing
    },
    // location is undefined
    projects: [
      {
        id: 10,
        name: 'Edge Project',
        description: 'Project without location',
        contactPersonId: 9,
      } as Product,
    ],
  },
  // 2. Person without a phone number
  {
    person: {
      id: 10,
      firstName: 'Emma',
      lastName: 'Johnson',
      email: 'emma.johnson@example.com',
      username: 'emmaj',
      title: 'Analyst',
      // phoneNumber is missing
      locationId: 2, // Re-use Lucerne
    },
    location: {
      id: 2,
      streetAddress: '456 Mountain Rd',
      city: 'Lucerne',
      region: 'Lucerne',
      zipCode: '6003',
      country: 'Switzerland',
    },
    projects: [],
  },
  // 3. Person with special characters and non-Latin scripts in names
  {
    person: {
      id: 11,
      firstName: '张伟', // Chinese characters
      lastName: '',
      email: 'zhang.wei@example.cn',
      username: 'zhangwei',
      title: '设计师', // 'Designer' in Chinese
      phoneNumber: '+86 139 8765 4321',
      locationId: 5, // Shanghai
    },
    location: {
      id: 5,
      streetAddress: 'No. 88 Nanjing Road',
      city: 'Shanghai',
      region: 'Shanghai',
      zipCode: '200001',
      country: 'China',
    },
    projects: [
      {
        id: 11,
        name: '界面设计', // 'Interface Design' in Chinese
        description: '设计高质量的用户界面', // 'Designing high-quality user interfaces'
        contactPersonId: 11,
      } as Product,
    ],
  },
  // 4. Person with missing title
  {
    person: {
      id: 12,
      firstName: 'Ola',
      lastName: 'Nordmann',
      email: 'ola.nordmann@example.no',
      username: 'olan',
      // title is missing
      phoneNumber: '+47 123 45 678', // Norwegian mobile number
      locationId: 9,
    },
    location: {
      id: 9,
      streetAddress: 'Karl Johans gate 1',
      city: 'Oslo',
      region: 'Oslo',
      zipCode: '0154',
      country: 'Norway',
    },
    projects: [
      {
        id: 12,
        name: 'Norwegian Project',
        // description is missing
        contactPersonId: 12,
      } as Product,
    ],
  },
  // 5. Person with multiple projects (both Products and Repositories)
  {
    person: {
      id: 13,
      firstName: 'Anita',
      lastName: 'Singh',
      email: 'anita.singh@example.in',
      username: 'anitasingh',
      title: 'Full Stack Developer',
      phoneNumber: '+91 98765 43210', // Indian phone number
      locationId: 10,
    },
    location: {
      id: 10,
      streetAddress: '123 MG Road',
      city: 'Bengaluru',
      region: 'Karnataka',
      zipCode: '560001',
      country: 'India',
    },
    projects: [
      {
        id: 13,
        name: 'E-commerce Platform',
        description: 'Building an e-commerce platform',
        contactPersonId: 13,
      } as Product,
      {
        id: 14,
        name: 'Mobile App',
        description: 'Developing a mobile application',
        contactPersonId: 13,
      } as Product,
      {
        id: 15,
        name: 'WebAPI Service',
        description: 'Creating Web APIs',
        contactPersonId: 13,
      } as Repository,
    ],
  },
  // 6. Projects with the same name but different IDs
  {
    person: {
      id: 15,
      firstName: 'Noura',
      lastName: 'Saleh',
      email: 'noura.saleh@example.ae',
      username: 'nouras',
      title: 'Software Architect',
      phoneNumber: '+971 50 123 4567', // UAE phone number
      locationId: 11,
    },
    location: {
      id: 11,
      streetAddress: 'Sheikh Zayed Road',
      city: 'Dubai',
      region: 'Dubai',
      country: 'United Arab Emirates',
    },
    projects: [
      {
        id: 16,
        name: 'Alpha Project',
        description: 'First Alpha Project',
        contactPersonId: 15,
      } as Product,
      {
        id: 17,
        name: 'Alpha Project',
        description: 'Second Alpha Project',
        contactPersonId: 15,
      } as Repository,
    ],
  },
  // 7. Person with no projects
  {
    person: {
      id: 16,
      firstName: 'Elena',
      lastName: 'Smirnova',
      email: 'elena.smirnova@example.ru',
      username: 'elenas',
      title: 'HR Manager',
      phoneNumber: '+7 916 1234567',
      locationId: 8, // Reuse Moscow
    },
    location: {
      id: 8,
      streetAddress: 'Prospekt Mira 12',
      city: 'Moscow',
      region: 'Moscow City',
      zipCode: '101000',
      country: 'Russia',
    },
    projects: [],
  },
  // 8. Person with very long names and descriptions
  {
    person: {
      id: 17,
      firstName: 'Maximilian Alexander Friedrich von Hohenlohe-Langenburg',
      lastName: 'Schmidt',
      email: 'maximilian.schmidt@example.de',
      username: 'maximilians',
      title: 'Senior Lead Principal Chief Executive Developer',
      phoneNumber: '+49 170 1234567',
      locationId: 12,
    },
    location: {
      id: 12,
      streetAddress: 'Unter den Linden 77',
      city: 'Berlin',
      region: 'Berlin',
      zipCode: '10117',
      country: 'Germany',
    },
    projects: [
      {
        id: 18,
        name: 'Project with an Incredibly Long and Descriptive Name That Goes On and On',
        description:
          'This project aims to explore the intricacies of software development paradigms and design patterns in a comprehensive manner.',
        contactPersonId: 17,
      } as Product,
    ],
  },
  // 9. Person with special characters in email and username
  {
    person: {
      id: 18,
      firstName: 'Jean-Pierre',
      lastName: "O'Neill",
      email: 'jean.pierre.oneill+dev@example.fr',
      username: "jean_pierre_o'neill",
      title: 'DevOps Intern',
      phoneNumber: '+33 6 12 34 56 78',
      locationId: 13,
    },
    location: {
      id: 13,
      streetAddress: '10 Rue de Rivoli',
      city: 'Paris',
      region: 'Île-de-France',
      zipCode: '75001',
      country: 'France',
    },
    projects: [
      {
        id: 19,
        name: 'Continuous Integration',
        // description is missing
        contactPersonId: 18,
      } as Repository,
    ],
  },
  // 10. Person working remotely (no location)
  {
    person: {
      id: 19,
      firstName: 'Samantha',
      lastName: 'Brown',
      email: 'samantha.brown@example.com',
      username: 'sambrown',
      title: 'Remote Developer',
      phoneNumber: '+1-555-123-4567',
      // locationId is missing
    },
    // location is undefined
    projects: [
      {
        id: 20,
        name: 'Remote Project',
        description: 'Working from home',
        contactPersonId: 19,
      } as Product,
    ],
  },
  // 11. Person with negative ID (edge case)
  {
    person: {
      id: -1,
      firstName: 'Ghost',
      lastName: 'User',
      email: 'ghost.user@example.com',
      username: 'ghost',
      title: 'Unknown',
      // locationId is missing
    },
    // location is undefined
    projects: [
      {
        id: 21,
        name: 'Ghost Project',
        description: 'This is a project with an invalid person ID',
        contactPersonId: -1,
      } as Product,
    ],
  },
];

export default allResults;