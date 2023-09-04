import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from "../form-input/form-input.component";
import './sign-up.style.scss';
import Button from "../button/button.component";




const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUp = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);

    const resetFormfields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('password do not match')
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName })
            resetFormfields();
        } catch (error) {
            if (error.code == 'auth/email-already-in-use')
                alert('email already in use')
            else { console.log('user creation error', error) }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Display Name"
                    onChange={handleChange}
                    type='text'
                    required name="displayName"
                    value={displayName} />

                <FormInput
                    label="Email"
                    onChange={handleChange}
                    type='email'
                    required name="email"
                    value={email} />

                <FormInput
                    label="Password"
                    onChange={handleChange}
                    type='password' 
                    required name="password"
                    value={password} />

                <FormInput
                    label="Confirm Password"
                    onChange={handleChange}
                    type='password' 
                    required name="confirmPassword"
                    value={confirmPassword} />

                <Button buttonType="default" type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUp;