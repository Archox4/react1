import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDi5eBgKHyb1zYvC2EuKiaUkl5By-6LvFU",
  authDomain: "react-soc-app.firebaseapp.com",
  databaseURL: "https://react-soc-app-default-rtdb.firebaseio.com",
  projectId: "react-soc-app",
  storageBucket: "react-soc-app.appspot.com",
  messagingSenderId: "87103377237",
  appId: "1:87103377237:web:3d96c2e01a4d0a4e5d69dc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
export default app;
