import '../styles/CardCategorie.css'
import * as React from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import logo from '../assets/logo_slogan_friendzone.png'


const listCategorieCard = [
    {
        categorie: 'Jeux de tir', url: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/fc/f9/a3.jpg', description: "Jeux de tir comme le paintball ou le laser game"
    },
    {
        categorie: 'Soirée dansante', url: 'https://www.lescoulissesdiscotheque.fr/public/img/big/AdobeStock278700158jpg_5e96d087451c7.jpg'
    },
    {
        categorie: 'Sortie culturelle', url: 'https://reyssouze.centres-sociaux.fr/files/2017/11/sorties-culturelles3.png'
    },
    {
        categorie: 'Concert', url: 'https://img.freepik.com/photos-gratuite/public-enthousiaste-regardant-feux-artifice-confettis-s-amusant-lors-festival-musique-nuit-espace-copie_637285-559.jpg'
    },
    {
        categorie: 'Sport', url: 'https://img.freepik.com/vecteurs-libre/concept-equipement-sport_1284-13034.jpg?w=360'
    },
    {
        categorie: 'Soirée jeux de société', url: 'http://www.mqvillejean.fr/images/369/soiree-jeu.jpg'
    },
    {
        categorie: 'Sortie chill', url: 'https://media.istockphoto.com/id/994808176/photo/happy-friends-cheering-and-drinking-cocktails-at-beach-party-outdoor-young-millennials-people.jpg?s=612x612&w=0&k=20&c=cx0_sX3s_t3kYQ5euzeUYYasmWA2u5Qi6cL3rCW9KHo='
    },
    {
        categorie: 'Activité en plein air', url: 'https://m1.quebecormedia.com/emp/emp/iStock_1096035138_copie347e0536-fe46-4d56-80c4-d0be45106279_ORIGINAL.jpg?impolicy=crop-resize&x=0&y=0&w=0&h=0&width=925'
    },
    {
        categorie: 'Cours de cuisine', url: 'https://www.wonderbox.fr/blog/wp-content/uploads/sites/4/2020/02/Nos-ateliers-culinaires-cours-de-cuisine-1-1.jpg'
    },
    {
        categorie: 'Bien-être', url: 'https://resize.elle.fr/original/var/plain_site/storage/images/minceur/bien-etre-relaxation/voici-la-tendance-bien-etre-de-2023-4077465/97831135-1-fre-FR/Voici-LA-tendance-bien-etre-de-2023.jpg'
    },
    {
        categorie: 'Parc & fun', url: 'https://ns328286.ip-37-187-113.eu/ew/wallpapers/800x480/14467_800x480.jpg'
    },
    {
        categorie: 'Ateliers', url: 'https://www.payssaintgilles-tourisme.fr/wp-content/uploads/wpetourisme/poterie-adulte-V.M.jpg'
    },
    {
        categorie: 'Activité aquatique', url: 'https://www.myluxurytravel.fr/wp-content/uploads/2017/07/towerofneptune-sharks-hotel-dubai-atlantis-palm.jpeg'
    },
    {
        categorie: 'Pilotage', url: 'https://www.motorsport-academy.fr/861-slider_produit/coffret-pilotage-elite.jpg'
    },
    {
        categorie: 'Visites', url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/7a/77/00/musee-des-beaux-arts.jpg?w=1200&h=1200&s=1'
    }
]



function CardCategorie() {
    return (
        <>
            <ul className="cards">
                {listCategorieCard.map((element, i) => {
                    return (
                        <>
                            <li key={i}>
                                <div className="card">
                                    <img src={element.url} className="card__image" alt="" />
                                    <div className="card__overlay">
                                        <div className="card__header">
                                            <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                                            <img className="card__thumb" src={logo} alt="" />
                                            <div className="card__header-text">
                                                <h3 className="card__title">{element.categorie}</h3>
                                                <span className="card__status">8 activité disponible</span>
                                            </div>
                                        </div>
                                        <p className="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
                                        <Button className='buttonCard' href='#' variant="contained">Rejoindre</Button>
                                    </div>
                                </div>
                            </li>
                        </>
                    )
                })}
            </ul>
            <div className='circleButton'>
                <a href='#' className='iconCircleButton'><KeyboardArrowDownIcon></KeyboardArrowDownIcon></a>
            </div>
        </>
    )
}

export default CardCategorie