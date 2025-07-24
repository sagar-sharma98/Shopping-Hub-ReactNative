import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDNDVDbUFP4zj52t_vZK5oYuAqrKSxkG8M",
  authDomain: "login-c1d2a.firebaseapp.com",
  projectId: "login-c1d2a",
  storageBucket: "login-c1d2a.appspot.com",
  messagingSenderId: "328055005848",
  appId: "1:328055005848:web:45998180a734a1969626ed",
  measurementId: "G-1F5CFGJ76N",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
