import Nav from './components/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import './styles/App.scss';
import Footer from "./components/Footer";
import Authentication from "./components/authentication/AuthenticationComponent";
import ActivityCard from "./components/activity/SingleActivity"

function App() {
  return (
    <>
      <Nav />
        <div className="container blur-background">
          <div className="containing">
            <Routes>
              //ajouter les routes ici
              <Route path="/" element={<Home />} />
              <Route path="/authentification" element={<Authentication />} />
              <Route path="/activité" element={<ActivityCard />} />
            </Routes>
          </div>
        </div>
      <Footer/>
    </>
  );
}

export default App;