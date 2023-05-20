import React, { useState } from 'react';
import './RegisterForm.scss';
import IconLeft from './icons8-personne-homme-64.png'; // Remplacez par le chemin de votre icône pour la bulle gauche
import IconRight from './icons8-personne-homme-64_1.png'; // Remplacez par le chemin de votre icône pour la bulle droite
import '../../../validators/validators';
import * as Validators from '../../../validators/validators';

export default function RegisterForm() {
    const [errors, setErrors] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [isFirstName, setIsFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLastname, setIsLastName] = useState('');
    const [age, setAge] = useState('');
    const [isAge, setIsAge] = useState('');
    const [address, setAddress] = useState('');
    const [isAddress, setIsAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [isPostalCode, setIsPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [isCity, setIsCity] = useState('');
    const [phone, setPhone] = useState('');
    const [isPhone, setIsPhone] = useState('');
    const [sex, setSex] = useState('');
    const [isSex, setIsSex] = useState('');
    const [email, setEmail] = useState('');
    const [isEmail, setIsEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPassword, setIsPassword] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [isPseudo, setIsPseudo] = useState('');
    
    const checkEmail = (newEmail) => {
        newEmail ? setIsEmail(true) : setIsEmail(false);
        if(!Validators.validEmail(newEmail)) {
            errors.email = 'Email invalide';
            //vérifier s'il n'existe pas déjà dans la base de données
        } else {
            errors.email = '';
        }
    }
    
    const checkFirstName = (newFirstName) => {
        newFirstName ? setIsFirstName(true) : setIsFirstName(false);
        if(!Validators.validName(newFirstName)) {
            errors.firstName = 'Prénom invalide';
        } else {
            errors.firstName = '';
        }
    }
    
    const checkLastName = (newLastName) => {
        newLastName ? setIsLastName(true) : setIsLastName(false);
        if(!Validators.validName(newLastName)) {
            errors.lastName = 'Nom invalide';
        } else {
            errors.lastName = '';
        }
    }
    
    const checkPseudo = (newPseudo) => {
        newPseudo ? setIsPseudo(true) : setIsPseudo(false);
        if(!Validators.validName(newPseudo)) {
            errors.pseudo = 'Pseudo invalide';
            //vérifier s'il n'existe pas déjà dans la bdd 
        } else {
            errors.pseudo = '';
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Mot de passe:', password);
        console.log('Pseudo', pseudo);
        
        // On remet à vide le formulaire
        setFirstName('');
        setLastName('');
        setAge('');
        setAddress('');
        setPostalCode('');
        setCity('');
        setPhone('');
        setSex('');
        setEmail('');
        setPassword('');
        setPseudo('');
    };

    return (
        <div className="register-form-container">
            <form onSubmit={handleSubmit} className="register-form">
                
                <div className="message-row">
                    <img src={IconLeft} alt="left icon" className="icon-left" />
                    <div className="bubble-left">
                        <label htmlFor="firstName">Quelle est votre prénom ?</label>
                    </div>
                </div>
                <div className="message-row">
                    <div className="bubble-right">
                        <input
                            placeholder="Votre prénom"
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => {setFirstName(e.target.value); checkFirstName(e.target.value);}}
                            required
                        />
                    </div>
                    <img src={IconRight} alt="right icon" className="icon-right" />
                </div>
                
                <div className="message-row">
                    <img src={IconLeft} alt="left icon" className="icon-left" />
                    <div className="bubble-left">
                        <label htmlFor="lastName">Quelle est votre nom de famille ?</label>
                    </div>
                </div>
                <div className="message-row">
                    <div className="bubble-right">
                        <input
                            placeholder="Votre nom"
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => {setLastName(e.target.value); checkLastName(e.target.value);}}
                            required
                        />
                    </div>
                    <img src={IconRight} alt="right icon" className="icon-right" />
                </div>
                
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

                <div className="message-row">
                    <img src={IconLeft} alt="left icon" className="icon-left" />
                    <div className="bubble-left">
                        <label htmlFor="email">Quelle âge avez vous ?</label>
                    </div>
                </div>
                <div className="message-row">
                    <div className="bubble-right">
                        <input
                            placeholder="Votre age"
                            type="number"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </div>
                    <img src={IconRight} alt="right icon" className="icon-right" />
                </div>
                
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
                <div className="message-row">
                    <img src={IconLeft} alt="left icon" className="icon-left" />
                    <div className="bubble-left">
                        <label htmlFor="pseudo">Quel est votre pseudo ?</label>
                    </div>
                </div>
                <div className="message-row">
                    <div className="bubble-right">
                        <input
                            placeholder={'Votre pseudo'}
                            type="text"
                            id="pseudo"
                            value={pseudo}
                            onChange={(e) => {setPseudo(e.target.value); checkPseudo(e.target.value);}}
                            required
                        />
                    </div>
                    <img src={IconRight} alt="right icon" className="icon-right" />
                </div>
                <button className={'submit-register'} type="submit">S'inscrire</button>
            </form>
            <div>
                <p>{errors.firstName}</p>
                <p>{errors.lastName}</p>
            </div>
        </div>
    );
}
