import './App.css';
import {BrowserRouter, Routes, Route, uselayout} from "react-router-dom"
import Home from './View/Home';
import "bootstrap/dist/css/bootstrap.min.css"
import Header from './Components/HeaderComponent';
import "./css/index.css"
import Footer from './Components/FooterComponent';
import Costume from './View/Costume';


function App() {
  return (
    <div className="App main-layout">
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict/costume" element={<Costume/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  </div>
  );
}

export default App;
