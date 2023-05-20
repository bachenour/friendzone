import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SwitchButtonComponent.scss'

const SwitchButtonComponent = ({ onSelect }) => {
    const [selectedOption, setSelectedOption] = useState('connexion');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onSelect(option);
    };

    return (
        <div className="switch-button">
            <button
                className={`option1 ${selectedOption === 'connexion' ? 'selected' : ''}`}
                onClick={() => handleOptionClick('connexion')}
            >
                Connexion
            </button>
            <button
                className={`option2 ${selectedOption === 'inscription' ? 'selected' : ''}`}
                onClick={() => handleOptionClick('inscription')}
            >
                Inscription
            </button>
        </div>
    );
};

SwitchButtonComponent.propTypes = {
    onSelect: PropTypes.func.isRequired,
};

export default SwitchButtonComponent;
