import 'dotenv/config';

export const config = {
  PORT: process.env.PORT || 3000,
  BACKEND_URL: process.env.BACKENDFF_URL || 'https://api.example.com',
};
