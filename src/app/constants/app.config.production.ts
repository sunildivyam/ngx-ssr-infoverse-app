import { AppConfig } from '@annuadvent/ngx-core/app-config';

export const appConfig: AppConfig = {
  name: 'annuadvent',
  copyrightText: 'copyright©annuadvent. All rights reserved.',
  themeName: 'skyBlue',
  apiBaseUrl: 'https://www.annuadvent.com', // When running prod on hosting server
  imagesSourceUrl: '/getImage?imageId=',
  loginUrl: '/login',
  logoutUrl: '/login',
  profileUrl: '/dashboard',
  adminEmail: 'sunil.divyam@gmail.com',
  defaultPageSize: 5,
  tNcUrl: 'stories/terms-and-conditions',
  privacyPolicyUrl: 'stories/privacy-policy',
  contactUsUrl: 'stories/contact-us',
  aboutUsUrl: 'stories/about-us',
  metaInfo: {
    title: 'Explore Stories, News, Quizes and Infoverse with Annu Advent',
    description: `Embark on a knowledge-filled adventure with Annu Advent App! Welcome to a world of endless exploration and enlightenment, where the thirst for knowledge meets the allure of captivating narratives. Unravel the mysteries of technology, stay ahead of the business world's pulse, dive into groundbreaking research, and empower yourself through education. Our collection of insightful articles and captivating stories spans the globe, offering a tapestry of perspectives and insights from experts and enthusiasts alike.
But that's not all - the journey doesn't stop there! Engage your intellect with brain-teasing quizzes that challenge and inspire, keeping you at the forefront of trivia mastery. Delve into the realms of diverse topics and immerse yourself in a universe of information, unlocking new dimensions of understanding and curiosity.
With Annu Advent App as your trusted guide, the pursuit of knowledge knows no bounds. Our curated content opens doorways to continuous discovery and growth, empowering you to forge your path and become a lifelong learner.`,
    keywords:
      'Knowledge Adventure, Insightful Articles, Captivating Stories, Technology Insights, Business Updates, Groundbreaking Research, Empowering Education, Global Perspectives, Brain Teasing Quizzes, Endless Exploration, Continuous Learning, Curated Content, Lifelong Learner, Community of Knowledge Seekers, Storytelling Enthusiasts, Ignite Your Passion, Thrill of Learning, Joy of Discovery, Embrace Knowledge, Annu Advent App',
    robots: 'index, follow',
    'Content-Type': 'text/html; charset=utf-8',
    language: 'english',
    'revisit-after': '7 days',
    author: 'Annu Advent',
    type: 'article',
    'article:published_time': '2023-01-01T17:53:35.868Z',
    'article:author': 'Annu Advent',
    'article:section': 'technology',
    'article:tag':
      'Knowledge Adventure, Insightful Articles, Captivating Stories, Technology Insights, Business Updates, Groundbreaking Research, Empowering Education, Global Perspectives, Brain Teasing Quizzes, Endless Exploration, Continuous Learning, Curated Content, Lifelong Learner, Community of Knowledge Seekers, Storytelling Enthusiasts, Ignite Your Passion, Thrill of Learning, Joy of Discovery, Embrace Knowledge, Annu Advent App',
    image: '/assets/annu-advent-page.jpeg',
    url: '',
    card: 'summary_large_image',
    site_name: 'Annu Advent',
    audio: '',
    video: '',
  },
  mainMenuItems: [
    {
      title: 'Technology as business',
      href: ['./technology'],
    },
    {
      title: 'Business Techniques',
      href: ['./business-techniques'],
    },
    {
      title: 'Research',
      href: ['./research'],
    },
  ],
};
