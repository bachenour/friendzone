import logo from "../../assets/logo_slogan_friendzone.png";
import '../../styles/CardCategorie.css'
import Button from "@mui/material/Button";
import * as React from "react";
import uuid from "react-uuid";
import {Box, InputLabel, Modal, TextField, Typography} from "@mui/material";
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    zIndex: 7,
};
function ActivityCard({activity}) {
    const [openModal, setOpenModal] = React.useState(false);


    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleJoiningActivity = () => {
        
        console.log("Joining activity");
    }
    return(
        <>
            <li key={uuid()}>
                <div className="card">
                    <img src={activity.category.icon} className="card__image" alt="" />
                    <div className="card__overlay">
                        <div className="card__header">
                            <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                            <img className="card__thumb" src={logo} alt="" />
                            <div className="card__header-text">
                                <h2 className="card__title">{activity.subject} à {activity.city}</h2>
                                <h3 className="card__auteur">{activity.category.name}</h3>
                                <h5 className="card__auteur">Par {activity.user.pseudo} au  :  </h5>
                                <span className="card__status"></span>
                            </div>
                        </div>
                        <p className="card__description">{activity.date_activity} <br/> Adresse : {activity.address} <br/> Max. {activity.max_person} personnes</p>
                        <Button className='buttonCard' onClick={handleOpenModal} variant="contained" >Rejoindre</Button>
                    </div>
                </div>
            </li>
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box className="formContainer" sx={style}>
                    <Typography className="formField" variant="h3" component="div" gutterBottom>
                        Vous vous apprêtez à rejoindre l'activité {activity.subject} à {activity.city}
                    </Typography>
                    
                    <Typography className="formField" variant="h5" component="div" gutterBottom>
                        Vous pouvez contacter l'organisateur de l'activité pour plus d'informations <br/>
                        L'annulation de votre participation est possible jusqu'à 24h avant l'activité
                    </Typography>
                    
                    <Button onClick={handleJoiningActivity} type="submit" variant="contained" >
                        Je rejoins l'activité  
                    </Button>
                    <Button onClick={handleCloseModal} variant="contained">
                        Annuler
                    </Button>

                    
                </Box>
            </Modal>
        
        </>
    )
    
}
export default ActivityCard;