import { Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/HomePage/HomePage";
import About from "./Components/Pages/AboutPage/AboutPage";
import Toolbar from "./Components/Navigation/Toolbar/Toolbar";
import Footer from "./Components/Navigation/Footer/Footer";
import Login from "./Containers/LoginPage/LoginPage";
import Logout from "./Containers/LogoutPage";
import NewChartForm from "./Components/Pages/NewChartPage/NewChartPage";
import CreateChart from "./Components/Pages/CreateChartPage/CreateChartPage";
import BuyCredits from "./Components/Pages/BuyCredits/BuyCredisPage";
import PreviousDiagrams from "./Components/Pages/MyChartsPage/MyCharts";
import YourChartPage from "./Components/Pages/YourChart/YourChart";

function App() {
  return (
    <div className="App">
      <Toolbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="newchart" element={<NewChartForm />} />
        <Route path="createchart" element={<CreateChart />} />
        <Route path="yourchart" element={<YourChartPage />} />
        <Route path="buycredits" element={<BuyCredits />} />
        <Route path="mycharts" element={<PreviousDiagrams />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
