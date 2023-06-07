import React from "react";
import Icon from './icons8-personne-homme-64.png'; // Remplacez par le chemin de votre icône pour la bulle gauche


export default function LeftBubbleComponent(htmlFor, label) {
    return (
        <div className="message-row">
            <img src={Icon} alt="left icon" className="icon-left"/>
            <div className="bubble-left">
                <label htmlFor={htmlFor}>{label}</label>
            </div>
        </div>
    );
}