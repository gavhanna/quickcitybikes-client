export const apiUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://quickcitybikes.com/api';

export const appVersion = '1.2.2';
