import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { auth,signInwithGooglePopup,signInWithGoogleRedirect } from "../../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import SignUp from "../../components/sign-up/sign-up.component";




const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInwithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    
   


    return (
        <div>
            <h1>SIGN IN PAge</h1>
            <button onClick={logGoogleUser}>
                Sign in with google popup
            </button>

            <SignUp/>

        </div>
    )
}
export default SignIn;