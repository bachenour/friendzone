import '../styles/Nav.css'
import logo from '../assets/logo_slogan_friendzone.png'
import {Link} from "react-router-dom";
import {faHouse} from "@fortawesome/free-solid-svg-icons/faHouse";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Nav() {
    return (
        <div className="backgroundNav">
            <nav className="navigation row align-items-center">
                <div className="col-2 text-start">
                    <FontAwesomeIcon icon={faHouse} /> 
                    <Link to="/"> Accueil</Link>
                </div>
                <div className="col-2 text-center">
                    <img className="logoFriendZone mx-auto d-block" src={logo}/>
                </div>
                <div className="col-2 text-end">
                    <a><FontAwesomeIcon icon={faUser} /> Hakim</a>
                </div>
            </nav>
        </div>
    )
}

export default Nav