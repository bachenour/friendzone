import '../styles/Nav.css'
import logo from '../assets/logo_slogan_friendzone.png'
import {Link} from "react-router-dom";
import {faHouse} from "@fortawesome/free-solid-svg-icons/faHouse";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {closeSession} from "./authentication/utils";

function Nav() {
    const logout = () => {
        closeSession();
    };
    return (
        <div className="backgroundNav">
            <nav className="navigation row align-items-center">
                <div className="col-2 text-start">
                    <FontAwesomeIcon icon={faHouse} /> 
                    <Link to="/"> Accueil</Link>
                </div>
                {sessionStorage.getItem('firstName')&&
                    <>
                        <div className="col-2 text-center">
                            <img className="logoFriendZone mx-auto d-block" src={logo}/>
                        </div>    
                        <div className="col-2 text-end">
                            <span>
                                <a><FontAwesomeIcon icon={faPowerOff} onClick={logout}/>  </a>
                            </span>
                            <span>
                                <a><FontAwesomeIcon icon={faUser} /> {sessionStorage.getItem('firstName')}</a>
                            </span>
                        </div>
                    </>
                }
                {!sessionStorage.getItem('firstName')&&
                    <>
                        <div className="col-2 text-center">
                            <img className="logoFriendZone mx-auto d-block" src={logo}/>
                        </div>
                        <div className="col-2 text-end">
                            <span>
                                <FontAwesomeIcon icon={faUser} onClick={logout}/>
                                <Link to="/login"> Se connecter</Link>
                            </span>
                        </div>
                    </>
                }      
            </nav>
        </div>
    )
}

export default Nav