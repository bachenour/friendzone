import React, { useState } from 'react';
import './AuthenticationComponent.scss';
import SwitchButtonComponent from './switchbutton/SwitchButtonComponent';
import LoginForm from './login/LoginForm';
import RegisterForm from './register/RegisterForm';

export default function Authentication() {
    const [selectedOption, setSelectedOption] = useState('connexion');

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    return (
        <>
            <div className={'authenticationContainer'}>
                <SwitchButtonComponent onSelect={handleOptionSelect} />
            </div>

            {selectedOption === 'connexion' && 
                <div className="connexion">
                    <LoginForm />
                </div>
            }
            
            {selectedOption === 'inscription' &&
                <div className="inscription">
                    <RegisterForm />
                </div>
            }
        </>
    );
}
