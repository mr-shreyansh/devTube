import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUmh6WEVSxxwGBybBKdzeCikrkjbacGFY",
  authDomain: "devtube-3f5b3.firebaseapp.com",
  projectId: "devtube-3f5b3",
  storageBucket: "devtube-3f5b3.appspot.com",
  messagingSenderId: "922175223192",
  appId: "1:922175223192:web:2a4b3a8b50140de7be27ed",
  measurementId: "G-RS4CYD162D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;