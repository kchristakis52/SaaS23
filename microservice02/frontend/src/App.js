import { Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/HomePage/HomePage";
import About from "./Components/Pages/AboutPage/AboutPage";
import Toolbar from "./Components/Navigation/Toolbar/Toolbar";
import Footer from "./Components/Navigation/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Toolbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
