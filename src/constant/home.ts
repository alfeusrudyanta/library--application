const imageLink: string[] = [
  '/images/home-cover-img.png',
  '/images/home-cover-img.png',
  '/images/home-cover-img.png',
];

type GenreMenuType = {
  name: string;
  link: string;
};

const genreMenu: GenreMenuType[] = [
  {
    name: 'Fiction',
    link: '/icons/home-fiction.svg',
  },
  {
    name: 'Non-Fiction',
    link: '/icons/home-non-fiction.svg',
  },
  {
    name: 'Self-Improvement',
    link: '/icons/home-self-improvement.svg',
  },
  {
    name: 'Finance',
    link: '/icons/home-finance.svg',
  },
  {
    name: 'Science',
    link: '/icons/home-science.svg',
  },
  {
    name: 'Education',
    link: '/icons/home-education.svg',
  },
];

export { imageLink, genreMenu };
