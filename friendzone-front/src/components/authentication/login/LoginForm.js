import React, { useState } from 'react';
import './LoginForm.scss';
import IconLeft from './icons8-personne-homme-64.png'; // Remplacez par le chemin de votre icône pour la bulle gauche
import IconRight from './icons8-personne-homme-64_1.png'; // Remplacez par le chemin de votre icône pour la bulle droite
import * as Validators from "../../../validators/validators";


export default function LoginForm() {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [isEmail, setIsEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const checkEmail = (newEmail) => {
        newEmail ? setIsEmail(true) : setIsEmail(false);
        if(!Validators.validEmail(newEmail)) {
            errors.email = 'Email invalide';
        } else {
            errors.email = '';
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Mot de passe:', password);
        
        //On remet à vide le formulaire
        setEmail('');
        setPassword('');
    };

    return (
        <>
        <div className="login-form-container">
            <form onSubmit={handleSubmit} className="login-form">
                <div className="message-row">
                    <img src={IconLeft} alt="left icon" className="icon-left" />
                    <div className="bubble-left">
                        <label htmlFor="email">Quelle est votre adresse email ?</label>
                    </div>
                </div>
                <div className="message-row">
                    <div className="bubble-right">
                        <input
                            placeholder="Votre email"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value); checkEmail(e.target.value);}}
                            required
                        />
                    </div>
                    <img src={IconRight} alt="right icon" className="icon-right" />
                </div>
                {isEmail && !errors.email &&(
                    <>
                        <div className="message-row">
                            <img src={IconLeft} alt="left icon" className="icon-left" />
                            <div className="bubble-left">
                                <label htmlFor="password">Quel est votre mot de passe ?</label>
                            </div>
                        </div>
                        <div className="message-row">
                            <div className="bubble-right">
                                <input
                                    placeholder={'Votre mot de passe'}
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <img src={IconRight} alt="right icon" className="icon-right" />
                        </div>
                    </>)}
                <button className={'submit-login'} type="submit">Se connecter</button>
            </form>
        </div>
        <div>
            {errors.email}
        </div>
        </>
    );
}
