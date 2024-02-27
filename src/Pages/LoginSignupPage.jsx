import React, { useState } from 'react';
import LoginForm from '../Components/LoginForm.jsx';
import SignUpForm from '../Components/SignUpForm.jsx';

const LoginSignupPage = () => {
    const [showLoginForm, setShowLoginForm] = useState(true);

    const toggleForm = () => {
        setShowLoginForm(!showLoginForm);
    };

    return (
        <main>
            <div>
                <h2>{showLoginForm ? 'Login' : 'Sign Up'}</h2>
                {showLoginForm ? <LoginForm /> : <SignUpForm />}
                <button onClick={toggleForm}>
                    {showLoginForm ? 'No Account? Sign Up Here' : 'Have an Account? Login Here.'}
                </button>
            </div>
        </main>
    );
};

export default LoginSignupPage;