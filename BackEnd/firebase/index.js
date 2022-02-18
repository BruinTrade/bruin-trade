import firebase from "firebase/app"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCW0X2U1h8FCsW1myF5eRdd-xmovEi-TVA",
    authDomain: "bruintrade-81a97.firebaseapp.com",
    projectId: "bruintrade-81a97",
    storageBucket: "bruintrade-81a97.appspot.com",
    messagingSenderId: "567042045234",
    appId: "1:567042045234:web:eb09f022111d7acfbad32b",
    measurementId: "G-4SBER6RDML"
  };

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage

export default storage

/*
import { storage } from "./firebase";

const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
          });
      }
    );
  };
*/