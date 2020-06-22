import firebase from "firebase/app";
import "firebase/storage";

// config for firebase where user images are hosted.
firebase.initializeApp({
  storageBucket: "blogium-c1c36.appspot.com",
});

const storage = firebase.storage();

export { storage, firebase as default };
