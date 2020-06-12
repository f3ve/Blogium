import firebase from 'firebase/app'
import 'firebase/storage'
import config from '../config'

// const firebaseConfig = {
//   apiKey: config.API_KEY,
//   authDomain: config.AUTH_DOMAIN,
//   databaseURL: config.FIREBASE_URL,
//   projectId: config.PROJECT_ID,
//   storageBucket: config.BUCKET,
//   messagingSenderId: config.SENDER_ID,
//   appId: config.APP_ID,
//   measurementId: config.MEASUREMENT_ID
// }

firebase.initializeApp(
  {
    // apiKey: config.API_KEY,
    // authDomain: config.AUTH_DOMAIN,
    // databaseURL: config.FIREBASE_URL,
    // projectId: config.PROJECT_ID,
    storageBucket: "blogium-c1c36.appspot.com",
    // messagingSenderId: config.SENDER_ID,
    // appId: config.APP_ID,
    // measurementId: config.MEASUREMENT_ID
  }
)

const storage = firebase.storage()

export {
  storage, firebase as default
}