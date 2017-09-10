const env = process.env;
const isProduction = env.NODE_ENV === 'production';

export const environment = {
  development: !isProduction,
  production: isProduction,
  apiUrl: isProduction ? 'https://simple-bookshelf-api.herokuapp.com' : 'http://localhost:3002',
};
