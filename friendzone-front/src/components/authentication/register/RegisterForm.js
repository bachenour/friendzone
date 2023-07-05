import React, {useState} from 'react';
import './RegisterForm.scss';
import IconLeft from './icons8-personne-homme-64.png';
import IconRight from './icons8-personne-homme-64_1.png';
import '../../../validators/validators';
import * as Validators from '../../../validators/validators';
import Select from 'react-select';
import ErrorsComponent from '../../authentication/errors/ErrorsComponent';
import axios from 'axios';
import {closeSession, openSession} from "../utils";
import {useNavigate} from "react-router-dom";

export default function RegisterForm() {
    const navigate = useNavigate();

    const sexEnum = [
        { value: "homme", label: "Homme" },
        { value: "femme", label: "Femme" },
        { value: "autre", label: "Autre" }
    ];
    
    const [response, setResponse] = useState(null);
    
    const [errors, setErrors] = useState({});
    const [firstName, setFirstName] = useState('');
    const [isFirstName, setIsFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLastName, setIsLastName] = useState('');
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
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPassword, setIsPassword] = useState('');
    const [isConfirmPassword, setIsConfirmPassword] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [isPseudo, setIsPseudo] = useState('');

    const checkEmail = (newEmail) => {
        if (!Validators.validEmail(newEmail)) {
            errors.email = 'Votre adresse e-mail est invalide, votre e-mail doit contenir le caractère @ et au moins 1 caractère avant le @ et 3 caractères après le @';
            setIsEmail(false);
        } else {
            errors.email = '';
            setIsEmail(true);
        }
    }

    const checkCity = (city) =>{
        if (!Validators.validCity(city)) {
            errors.city = 'Votre ville est invalide, votre ville doit contenir au moins 3 caractères';
            setIsCity(false);
        } else {
            errors.city = '';
            setIsCity(true);
        }
    }
    const checkFirstName = (newFirstName) => {
        if (!Validators.validName(newFirstName)) {
            errors.firstName = "Le prénom que vous avez saisi est invalide, veuillez ne saisir que des lettres s'il vous plaît";
            setIsFirstName(false);
        } else {
            errors.firstName = '';
            setIsFirstName(true);
        }
    }

    const checkLastName = (newLastName) => {
        if (!Validators.validName(newLastName)) {
            errors.lastName = "Le nom que vous avez saisi saisi est invalide, veuillez ne saisir que des lettres s'il vous plaît";
            setIsLastName(false);
        } else {
            errors.lastName = '';
            setIsLastName(true);
        }
    }

    const checkPseudo = (newPseudo) => {
        if (!Validators.validName(newPseudo)) {
            errors.pseudo = 'Pseudo invalide';
            setIsPseudo(false);
            //vérifier s'il n'existe pas déjà dans la bdd 
        } else {
            errors.pseudo = '';
            setIsPseudo(true);
        }
    }

    const checkAddress = (newAddress) => {
        if (!Validators.validAddress(newAddress)) {
            errors.address = 'Adresse invalide';
            setIsAddress(false);
        } else {
            errors.address = '';
            setIsAddress(true);
        }
    }

    const checkPostalCode = (newPostalCode) => {
        if (!Validators.validPostalCode(newPostalCode)) {
            errors.postalCode = 'Votre code postal est invalide, celui-ci doit-être composé de 5 chiffres';
            setIsPostalCode(false);
        } else {
            errors.postalCode = '';
            setIsPostalCode(true);
        }
    }

    const checkPassword = (newPassword) => {
        if (!Validators.validPassword(newPassword)) {
            setIsPassword(false);
            errors.password = 'Le mot de passe est invalide';
        } else {
            errors.password = '';
            setIsPassword(true);
        }
    }

    const confirmPasswordCheck = (newConfirmPassword) => {
        if (newConfirmPassword !== password) {
            errors.confirmPassword = 'Les mots de passe ne correspondent pas';
            setIsConfirmPassword(false);
        } else {
            errors.confirmPassword = '';
            setIsConfirmPassword(true);
        }
    }
    
    const checkAge = (newAge) => {
        if (!Validators.validAge(newAge)) {
            errors.age = 'Votre âge est invalide, vous devez avoir minimum 18 ans';
            setIsAge(false);
        } else {
            errors.age = '';
            setIsAge(true);
        }
    }

    const checkPhone = (phone) => {
        if (!Validators.validPhone(phone)) {
            errors.phone = 'Votre numéro de téléphone est invalide, celui-ci doit-être composé de 10 chiffres';
            setIsPhone(false);
        } else {
            errors.phone = '';
            setIsPhone(true);
        }
    }
    
    const resetForm = () => {
        // On remet à vide le formulaire
        setFirstName('');
        setIsFirstName('');
        setLastName('');
        setIsLastName('');
        setAge('');
        setIsAge('');
        setAddress('');
        setIsAddress('');
        setPostalCode('');
        setIsPostalCode('');
        setCity('');
        setIsCity('');
        setPhone('');
        setIsPhone('');
        setSex('');
        setIsSex('');
        setEmail('');
        setIsEmail('');
        setPassword('');
        setConfirmPassword('');
        setIsConfirmPassword('');
        setIsPassword('');
        setPseudo('');
        setIsPseudo('');
    }
    
    const checkAllFields = () => {
        return !!(firstName && lastName)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post('http://127.0.0.1:3030/users/signup', {
            name: firstName,
            full_name: lastName,
            pseudo: pseudo,
            email: email,
            password: password,
            user_address: address,
            postal_code: postalCode,
            city: city,
            phone_number: phone,
            sex: sex,
            age: age
        })
            .then((response) => {
                setResponse(response.data);
                if(response.status === 200) {
                    resetForm();
                    closeSession();
                    openSession({
                        'token': response.data.token,
                        'firstName': firstName,
                        'username': pseudo,
                        'email': email,
                        'sex': sex,
                        'age': age,
                        'city': city
                    });
                    navigate('/');
                }
            })
    };


    return (
        <div className="register-form-container">
            <form onSubmit={handleSubmit} className="register-form">

                {/* Prénom */}
                <div className="message-row">
                    <img src={IconLeft} alt="left icon" className="icon-left"/>
                    <div className="bubble-left">
                        <label htmlFor="firstName">Bonjour, quel est votre prénom?</label>
                    </div>
                </div>
                <div className="message-row">
                    <div className={ errors.firstName ? "bubble-right error-bubble-right" : "bubble-right"}
                    >
                        <input
                            placeholder="Votre prénom"
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                                checkFirstName(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <img src={IconRight} alt="right icon" className="icon-right"/>
                </div>
                {errors.firstName && (
                    <ErrorsComponent error={ errors.firstName } />
                )}
                {isFirstName && (
                    <>
                        <div className="message-row">
                            <img src={IconLeft} alt="left icon" className="icon-left"/>
                            <div className="bubble-left">
                                <label htmlFor="lastName">Merci {firstName}, quel est votre nom de famille ?</label>
                            </div>
                        </div>
                        <div className="message-row">
                            <div className={ errors.lastName ? "bubble-right error-bubble-right" : "bubble-right"}>
                                <input
                                    placeholder="Votre nom"
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                        checkLastName(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <img src={IconRight} alt="right icon" className="icon-right"/>
                        </div>
                        {!isLastName && errors.lastName && (
                            <ErrorsComponent error={errors.lastName} />
                        )}
                        {isLastName && (
                            <>
                                <div className="message-row">
                                    <img src={IconLeft} alt="left icon" className="icon-left"/>
                                    <div className="bubble-left">
                                        <label htmlFor="email">Quelle est votre adresse email ?</label>
                                    </div>
                                </div>
                                <div className="message-row">
                                    <div className={ errors.email ? "bubble-right error-bubble-right" : "bubble-right"}>
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
                                    <img src={IconRight} alt="right icon" className="icon-right"/>
                                </div>
                                {!isEmail && errors.email && (
                                    <ErrorsComponent error={errors.email} />
                                )}
                                {isEmail && (
                                    <>
                                        <div className="message-row">
                                            <img src={IconLeft} alt="left icon" className="icon-left"/>
                                            <div className="bubble-left">
                                                <label htmlFor="email">Quel âge avez vous ?</label>
                                            </div>
                                        </div>
                                        <div className="message-row">
                                            <div className={ errors.age ? "bubble-right error-bubble-right" : "bubble-right"}>
                                                <input
                                                    placeholder="Votre age"
                                                    type="number"
                                                    id="age"
                                                    value={age}
                                                    onChange={(e) => {
                                                        setAge(e.target.value);
                                                        checkAge(e.target.value);
                                                    }}
                                                    required
                                                />
                                            </div>
                                            <img src={IconRight} alt="right icon" className="icon-right"/>
                                        </div>
                                        {!isAge && errors.age && (
                                            <ErrorsComponent error={errors.age} />
                                        )}
                                        {isAge && (
                                            <>
                                                <div className="message-row">
                                                    <img src={IconLeft} alt="left icon" className="icon-left"/>
                                                    <div className="bubble-left">
                                                        <label htmlFor="sex">Quel est votre sexe ?</label>
                                                    </div>
                                                </div>
                                                <div className="message-row">
                                                    <div className={ errors.sex ? "bubble-right error-bubble-right" : "bubble-right"}>
                                                        <Select 
                                                            placeholder="Votre sexe"
                                                            options={sexEnum} 
                                                            onChange={(e) => {setSex(e.value)}}
                                                            required
                                                        />
                                                    </div>
                                                    <img src={IconRight} alt="right icon" className="icon-right"/>
                                                </div>
                                                {!isSex && errors.sex && (
                                                    <ErrorsComponent error={errors.sex} />
                                                )}
                                                {sex && (
                                                    <>
                                                        <div className="message-row">
                                                            <img src={IconLeft} alt="left icon" className="icon-left"/>
                                                            <div className="bubble-left">
                                                                <label htmlFor="pseudo">Quel est votre pseudo ?</label>
                                                            </div>
                                                        </div>
                                                        <div className="message-row">
                                                            <div className={ errors.pseudo ? "bubble-right error-bubble-right" : "bubble-right"}>
                                                                <input
                                                                    placeholder={'Votre pseudo'}
                                                                    type="text"
                                                                    id="pseudo"
                                                                    value={pseudo}
                                                                    onChange={(e) => {
                                                                        setPseudo(e.target.value);
                                                                        checkPseudo(e.target.value);
                                                                    }}
                                                                    required
                                                                />
                                                            </div>
                                                            <img src={IconRight} alt="right icon" className="icon-right"/>
                                                        </div>
                                                        {!isPseudo && errors.pseudo && (
                                                            <ErrorsComponent error={errors.pseudo} />
                                                        )}
                                                        {isPseudo && (
                                                            <>
                                                                <div className="message-row">
                                                                    <img src={IconLeft} alt="left icon" className="icon-left"/>
                                                                    <div className="bubble-left">
                                                                        <label htmlFor="address">Quel est votre adresse
                                                                            ?</label>
                                                                    </div>
                                                                </div>
                                                                <div className="message-row">
                                                                    <div className={ errors.address ? "bubble-right error-bubble-right" : "bubble-right"}>
                                                                        <input
                                                                            placeholder={'Votre adresse'}
                                                                            type="text"
                                                                            id="address"
                                                                            value={address}
                                                                            onChange={(e) => {
                                                                                setAddress(e.target.value);
                                                                                checkAddress(e.target.value);
                                                                            }}
                                                                            required
                                                                        />
                                                                    </div>
                                                                    <img src={IconRight} alt="right icon"
                                                                         className="icon-right"/>
                                                                </div>
                                                                {!isAddress && errors.address && (
                                                                    <ErrorsComponent error={errors.address} />
                                                                )}
                                                                {isAddress && (
                                                                    <>
                                                                        <div className="message-row">
                                                                            <img src={IconLeft} alt="left icon"
                                                                                 className="icon-left"/>
                                                                            <div className="bubble-left">
                                                                                <label htmlFor="postalCode">Quel est votre code
                                                                                    postal ?</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="message-row">
                                                                            <div className={ errors.postalCode ? "bubble-right error-bubble-right" : "bubble-right"}>
                                                                                <input
                                                                                    placeholder={'Code postal'}
                                                                                    type="text"
                                                                                    id="postalCode"
                                                                                    value={postalCode}
                                                                                    onChange={(e) => {
                                                                                        setPostalCode(e.target.value);
                                                                                        checkPostalCode(e.target.value);
                                                                                    }}
                                                                                    required
                                                                                />
                                                                            </div>
                                                                            <img src={IconRight} alt="right icon"
                                                                                 className="icon-right"/>
                                                                        </div>
                                                                        {!isPostalCode && errors.postalCode && (
                                                                            <ErrorsComponent error={errors.postalCode} />
                                                                        )}
                                                                        {isPostalCode && (
                                                                            <>
                                                                                <div className="message-row">
                                                                                    <img src={IconLeft} alt="left icon"
                                                                                         className="icon-left"/>
                                                                                    <div className="bubble-left">
                                                                                        <label htmlFor="city">Quelle ville
                                                                                            habitez vous ?</label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="message-row">
                                                                                    <div className={ errors.city ? "bubble-right error-bubble-right" : "bubble-right"}>
                                                                                        <input
                                                                                            placeholder={'Ville'}
                                                                                            type="text"
                                                                                            id="city"
                                                                                            value={city}
                                                                                            onChange={(e) => {
                                                                                                setCity(e.target.value);
                                                                                                checkCity(e.target.value);
                                                                                            }}
                                                                                            required
                                                                                        />
                                                                                    </div>
                                                                                    <img src={IconRight} alt="right icon"
                                                                                         className="icon-right"/>
                                                                                </div>
                                                                                {!isCity && errors.city && (
                                                                                    <ErrorsComponent error={errors.city} />
                                                                                )}
                                                                                {isCity && (
                                                                                    <>
                                                                                        <div className="message-row">
                                                                                            <img src={IconLeft} alt="left icon"
                                                                                                 className="icon-left"/>
                                                                                            <div className="bubble-left">
                                                                                                <label htmlFor="phone">Quel est votre numéro de téléphone ?</label>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="message-row">
                                                                                            <div className={ errors.phone ? "bubble-right error-bubble-right" : "bubble-right"}>
                                                                                                <input
                                                                                                    placeholder={'Numéro de téléphone'}
                                                                                                    type="text"
                                                                                                    id="phone"
                                                                                                    value={phone}
                                                                                                    onChange={(e) => {
                                                                                                        setPhone(e.target.value);
                                                                                                        checkPhone(e.target.value);
                                                                                                    }}
                                                                                                    required
                                                                                                />
                                                                                            </div>
                                                                                            <img src={IconRight} alt="right icon"
                                                                                                 className="icon-right"/>
                                                                                        </div>
                                                                                        {!isPhone && errors.phone && (
                                                                                            <ErrorsComponent error={errors.phone} />
                                                                                        )}
                                                                                        {isPhone && (
                                                                                            <>
                                                                                                <div className="message-row">
                                                                                                    <img src={IconLeft} alt="left icon"
                                                                                                         className="icon-left"/>
                                                                                                    <div className="bubble-left">
                                                                                                        <label htmlFor="password">Quel
                                                                                                            est votre mot de passe
                                                                                                            ?</label>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="message-row">
                                                                                                    <div className={ errors.password ? "bubble-right error-bubble-right" : "bubble-right"}>
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
                                                                                                    <img src={IconRight}
                                                                                                         alt="right icon"
                                                                                                         className="icon-right"/>
                                                                                                </div>
                                                                                                {!isPassword && errors.password && (
                                                                                                    <ErrorsComponent error={errors.password} />
                                                                                                )}
                                                                                                {isPassword && (
                                                                                                    <>
                                                                                                        <div className="message-row">
                                                                                                            <img src={IconLeft}
                                                                                                                 alt="left icon"
                                                                                                                 className="icon-left"/>
                                                                                                            <div
                                                                                                                className="bubble-left">
                                                                                                                <label
                                                                                                                    htmlFor="confirmPassword">Veuillez
                                                                                                                    confirmer votre mot
                                                                                                                    de passe</label>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="message-row">
                                                                                                            <div
                                                                                                                className={ errors.confirmPassword ? "bubble-right error-bubble-right" : "bubble-right"}>
                                                                                                                <input
                                                                                                                    placeholder={'Votre mot de passe'}
                                                                                                                    type="password"
                                                                                                                    id="confirmPassword"
                                                                                                                    value={confirmPassword}
                                                                                                                    onChange={(e) => {
                                                                                                                        setConfirmPassword(e.target.value);
                                                                                                                        confirmPasswordCheck(e.target.value)
                                                                                                                    }}
                                                                                                                    required
                                                                                                                />
                                                                                                            </div>
                                                                                                            <img src={IconRight}
                                                                                                                 alt="right icon"
                                                                                                                 className="icon-right"/>
                                                                                                        </div>
                                                                                                        {!isConfirmPassword && errors.confirmPassword && (
                                                                                                            <ErrorsComponent error={errors.confirmPassword} />
                                                                                                        )}
                                                                                                        {isConfirmPassword && (
                                                                                                            <button
                                                                                                                className={'submit-register'}
                                                                                                                type="submit">S'inscrire</button>
                                                                                                        )}
                                                                                                    </>)}
                                                                                            </>
                                                                                        )}
                                                                                    </>
                                                                                )}
                                                                            </>)}
                                                                    </>)}
                                                            </>)}
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </>)}
                            </>)}
                    </>)}
            </form>
        </div>
    );
}
