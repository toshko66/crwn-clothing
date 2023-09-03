import { signInwithGooglePopup } from "../../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInwithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    return (
        <div>
            <h1>SIGN IN PAge</h1>
            <button onClick={logGoogleUser}>
                Sign in with google
            </button>
        </div>
    )
}
export default SignIn;