import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        userCredential.user.getIdToken().then((idToken) => {
            console.log("Token:", idToken);
        });
    })
    .catch((error) => {
        console.error("Login Error:", error);
    });