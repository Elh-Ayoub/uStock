import './App.css';
import {BrowserRouter, Routes, Route, uselayout} from "react-router-dom"
import Home from './View/Home';
import "bootstrap/dist/css/bootstrap.min.css"
import Header from './Components/HeaderComponent';


function App() {
  return (
    <div className="App main-layout">
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
