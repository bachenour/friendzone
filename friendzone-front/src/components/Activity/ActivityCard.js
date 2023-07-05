import logo from "../../assets/logo_slogan_friendzone.png";
import '../../styles/CardCategorie.css'
import Button from "@mui/material/Button";
import * as React from "react";
import uuid from "react-uuid";

function ActivityCard({activity}) {
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
                                <h2 className="card__title"> {activity.subject}</h2>
                                <h3 className="card__title">{activity.category.name}</h3>
                                <h3 className="card__auteur">{activity.date_activity} </h3>
                                <h5 className="card__auteur">Par {activity.user.pseudo}</h5>
                                <span className="card__status">Max. {activity.max_person}</span>
                            </div>
                        </div>
                        <p className="card__description">{activity.address} - {activity.city}</p>
                        <Button className='buttonCard' href='#' variant="contained">Rejoindre</Button>
                    </div>
                </div>
            </li>
        
        </>
    )
    
}
export default ActivityCard;