import { Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/HomePage/HomePage";
import About from "./Components/Pages/AboutPage/AboutPage";
import Toolbar from "./Components/Navigation/Toolbar/Toolbar";
import Footer from "./Components/Navigation/Footer/Footer";
import Login from "./Containers/LoginPage/LoginPage";

function App() {
  return (
    <div className="App">
      <Toolbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />        
        <Route path="login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
