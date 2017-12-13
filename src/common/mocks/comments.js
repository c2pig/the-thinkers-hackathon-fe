import { extractTagsByUserName } from '../helpers';

export default [
  {
    postType: 'contact-me',
    userName: 'Kong',
    date: 'Today at 5:42PM',
    message: 'Hello',
    rating: 2,
    totalHired: 99,
    headline: 'thinking in code',
    phone: '123',
    email: 'kong1@gmail.com',
    tags: extractTagsByUserName('Kong')
  },
  {
    postType: 'post-jd',
    userName: 'KaWeng',
    date: 'Today at 5:42PM',
    message: 'Hello',
    rating: 4,
    totalHired: 5,
    headline: 'I am a Project Manager',
    phone: '123',
    email: 'kaweng@gmail.com',
    tags: extractTagsByUserName('KaWeng')
  }
];
