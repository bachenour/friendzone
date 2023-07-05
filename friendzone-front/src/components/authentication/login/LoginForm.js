import React, { useState } from 'react';
import './LoginForm.scss';
import IconLeft from './icons8-personne-homme-64.png'; // Remplacez par le chemin de votre icône pour la bulle gauche
import IconRight from './icons8-personne-homme-64_1.png'; // Remplacez par le chemin de votre icône pour la bulle droite
import * as Validators from "../../../validators/validators";
import {openSession} from "../utils";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export default function LoginForm() {
    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [isEmail, setIsEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPassword, setIsPassword] = useState('');
    
    
    const checkEmail = (newEmail) => {
        if(!Validators.validEmail(newEmail)) {
            errors.email = 'Email invalide';
            setIsEmail(false);
        } else {
            setEmail(newEmail);
            setEmail(newEmail);
            setIsEmail(true);
            errors.email = '';
        }
    }
    
    const checkPassword = (newPassword) => {
        if(!Validators.validPassword(newPassword)) {
            errors.password = 'Mot de passe invalide';
            setIsPassword(false);
        } else {
            setPassword(newPassword);
            setIsPassword(true);
            errors.password = '';
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Mot de passe:', password);
        
        await axios.post('http://127.0.0.1:3030/users/signin', {
            email: email,
            password: password
        })
            .then((response) => {
                if (response.status === 200) {
                    openSession(response.data.user);
                    navigate('/');
                }
            }
        )
            .catch((error) => {
                console.log(error);
                console.log('Connexion échouée');
                setErrors(error.response.data.errors);
            }
        );
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
                            onChange={(e) => {
                                setEmail(e.target.value);
                                checkEmail(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <img src={IconRight} alt="right icon" className="icon-right" />
                </div>
                {errors.email &&
                    <div className="message-row">
                        <img src={IconLeft} alt="left icon" className="icon-left" />
                        <div className="bubble-left">
                            <label htmlFor="password">Cet e-mail est incorrect veuillez respecter le format suivant : nomprenom@gmail.com   </label>
                        </div>
                    </div>    
                }
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
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        checkPassword(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <img src={IconRight} alt="right icon" className="icon-right" />
                        </div>
                    </>)}
                <button className={'submit-login'} type="submit">Se connecter</button>
            </form>
        </div>
        </>
    );
}
