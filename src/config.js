module.exports = {
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api',
  TOKEN_KEY: 'client-auth-token',
  API_KEY: process.env.API_KEY,
  AUTH_DOMAIN: process.env.AUTH_DOMAIN,
  FIREBASE_URL: process.env.FIREBASE_URL,
  PROJECT_ID: process.env.PROJECT_ID,
  BUCKET: process.env.BUCKET,
  SENDER_ID: process.env.SENDER_ID,
  APP_ID: process.env.APP_ID,
  MEASUREMENT_ID: process.env.MEASUREMENT_ID
}