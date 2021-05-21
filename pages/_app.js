import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../firebase";
import Loading from "../components/Loading";
import firebase from "firebase";
import { useEffect } from "react";
import { UserProvider } from "../GlobalContext";
import Login from "./login";

function MyApp({ Component, pageProps }) {
	const [user, loading] = useAuthState(auth);

	useEffect(() => {
		if (user) {
			db.collection("users").doc(user.uid).set(
				{
					email: user.email,
					lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
					photoURL: user.photoURL,
				},
				{ merge: true }
			);
		}
	}, [user]);

	if (loading) return <Loading />;
	if (!user) return <Login />;

	return (
		<UserProvider>
			<Component {...pageProps} />
		</UserProvider>
	);
}

export default MyApp;
