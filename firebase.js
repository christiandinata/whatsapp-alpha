import firebase from "firebase";

var firebaseConfig = {
	apiKey: "AIzaSyAZ9i3DU3GGlHoKRPrfJVTv435BZMfWbMY",
	authDomain: "next-whatsapp-6b2f1.firebaseapp.com",
	projectId: "next-whatsapp-6b2f1",
	storageBucket: "next-whatsapp-6b2f1.appspot.com",
	messagingSenderId: "822701644104",
	appId: "1:822701644104:web:99f118938a60195e6a3b7d",
};

// for server-side rendering

const Firebase = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.app();

const db = Firebase.firestore();
const auth = Firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
