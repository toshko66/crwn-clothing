import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyC4D1S4T7Lnfxtcv4e-5dyywOuL32vWve4",
    authDomain: "crwn-clothing-db-f73ad.firebaseapp.com",
    projectId: "crwn-clothing-db-f73ad",
    storageBucket: "crwn-clothing-db-f73ad.appspot.com",
    messagingSenderId: "735070682110",
    appId: "1:735070682110:web:d551a9a3feda60f83b1eaf"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


const googleProvider = new GoogleAuthProvider();


googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInwithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect =()=> signInWithRedirect(auth, googleProvider);


export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);


    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }
    return userDocRef;
}


export const  createAuthUserWithEmailAndPassword= async(email,password)=>{
    if(!email|| !password) return;

return await createUserWithEmailAndPassword(auth,email,password); 
}