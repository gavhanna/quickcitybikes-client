export const apiUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : '/api';

export const appVersion = '1.2.3';
