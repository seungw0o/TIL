import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfkGL_yIwUz1NDhq_b2q2h6K-kCqPzNuo",
  authDomain: "nwitter-reloaded-nomad.firebaseapp.com",
  projectId: "nwitter-reloaded-nomad",
  storageBucket: "nwitter-reloaded-nomad.appspot.com",
  messagingSenderId: "317866261721",
  appId: "1:317866261721:web:2bb7fbbec266fdd39152c8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
