import Nav from './components/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import './styles/App.scss';
import Footer from "./components/footer/Footer";
import Authentication from "./components/authentication/AuthenticationComponent";
import Posts from "./components/Posts/Posts";
import PopUpActivity from "./components/PopUpActivity";

function App() {
  const session = localStorage.getItem('token');
  
  return (
    <>
      <Nav />
      {session !== null ? <PopUpActivity /> : null}
        <div className="container blur-background">
          <div className="containing">
            <Routes>
              //ajouter les routes ici
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Authentication />} />
              <Route path="/friendplace" element={<Posts />} />
            </Routes>
            
          </div>
        </div>
      <Footer/>
    </>
  );
}

export default App;