import '../styles/Nav.css'
import logo from '../assets/friends-zone-logo.png'

function Cart() {
    return (
        <div className="backgroundNav">
            <nav className="navigation">
                    <a href="http://localhost:3000/">Acceuil</a>
                    <img className="logoFriendZone" src={logo}/>
                    <a>Hakim</a>
            </nav>
        </div>
    )
}

export default Cart