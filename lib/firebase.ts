import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "",
  projectId: "YOUR_PROJECT_ID",
  // ...other config values
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
