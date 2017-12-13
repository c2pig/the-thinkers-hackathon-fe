import { extractTagsByUserName } from '../helpers';

export default [
  {
    postType: 'contact-me',
    username: 'kong',
    date: 'Today at 5:42PM',
    message: 'Hello',
    rating: 2,
    totalHired: 99,
    headline: 'thinking in code',
    phone: '123',
    email: 'kong1@gmail.com',
    tags: extractTagsByUserName('Kong'),
  },
];
