import { AppConfig } from "@annuadvent/ngx-core/app-config";

export const appConfig: AppConfig = {
  name: "Business",
  copyrightText: "copyright©annu-business. All rights reserved.",
  themeName: "skyBlue",
  apiBaseUrl: "http://localhost:4200",
  imagesSourceUrl: "/getImage?imageId=",
  loginUrl: "/login",
  logoutUrl: "/login",
  profileUrl: "/dashboard",
  adminEmail: "info@annubiztech.com",
  defaultPageSize: 6,
  tNcUrl: "stories/terms-and-conditions",
  privacyPolicyUrl: "stories/privacy-policy",
  contactUsUrl: "stories/contact-us",
  aboutUsUrl: "stories/about-us",
  metaInfo: {
    title: "Explore Stories, News, Quizes and Infoverse with Annu Business",
    description: `Embark on a knowledge-filled adventure with Annu Business App! Welcome to a world of endless exploration and enlightenment, where the thirst for knowledge meets the allure of captivating narratives. Unravel the mysteries of technology, stay ahead of the business world's pulse, dive into groundbreaking research, and empower yourself through education.Our collection of insightful articles and captivating stories spans the globe, offering a tapestry of perspectives and insights from experts and enthusiasts alike.
But that's not all - the journey doesn't stop there! Engage your intellect with brain - teasing quizzes that challenge and inspire, keeping you at the forefront of trivia mastery.Delve into the realms of diverse topics and immerse yourself in a universe of information, unlocking new dimensions of understanding and curiosity.
With Annu Business App as your trusted guide, the pursuit of knowledge knows no bounds.Our curated content opens doorways to continuous discovery and growth, empowering you to forge your path and become a lifelong learner.`,
    keywords:
      "Knowledge Adventure, Insightful Articles, Captivating Stories, Technology Insights, Business Updates, Groundbreaking Research, Empowering Education, Global Perspectives, Brain Teasing Quizzes, Endless Exploration, Continuous Learning, Curated Content, Lifelong Learner, Community of Knowledge Seekers, Storytelling Enthusiasts, Ignite Your Passion, Thrill of Learning, Joy of Discovery, Embrace Knowledge, Annu Business App",
    robots: "index, follow",
    "Content-Type": "text/html; charset=utf-8",
    language: "english",
    "revisit-after": "7 days",
    author: "Annu Business",
    type: "article",
    "article:published_time": "2022-01-03T17:53:35.868Z",
    "article:author": "Annu Business",
    "article:section": "technology",
    "article:tag":
      "Knowledge Adventure, Insightful Articles, Captivating Stories, Technology Insights, Business Updates, Groundbreaking Research, Empowering Education, Global Perspectives, Brain Teasing Quizzes, Endless Exploration, Continuous Learning, Curated Content, Lifelong Learner, Community of Knowledge Seekers, Storytelling Enthusiasts, Ignite Your Passion, Thrill of Learning, Joy of Discovery, Embrace Knowledge, Annu Business App",
    image: "/assets/annu-advent-page.jpeg",
    url: "",
    card: "summary_large_image",
    site_name: "Annu Business",
    audio: "",
    video: "",
  },
  mainMenuItems: [
    {
      title: "Sample Category 1",
      href: ["./sample-category-1"],
    },
    {
      title: "Sample Category 2",
      href: ["./sample-category-2"],
    },
    {
      title: "Sample Category 3",
      href: ["./sample-category-3"],
    },
    {
      title: "Sample Category 4",
      href: ["./sample-category-4"],
    },
  ],
  socialMedia: {
    facebook: "https://www.facebook.com/profile.php?id=100089738215994",
    twitter: "https://twitter.com/annuadvent",
    linkedin: "https://www.linkedin.com/company/annuadvent",
    instagram: "https://www.instagram.com/annuadvent/",
  },
};
