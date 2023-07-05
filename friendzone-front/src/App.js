import Nav from './components/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import './styles/App.scss';
import Footer from "./components/footer/Footer";
import Authentication from "./components/authentication/AuthenticationComponent";

function App() {
  return (
    <>
      <Nav />
        <div className="container blur-background">
          <div className="containing">
            <Routes>
              //ajouter les routes ici
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Authentication />} />
            </Routes>
          </div>
        </div>
      <Footer/>
    </>
  );
}

export default App;