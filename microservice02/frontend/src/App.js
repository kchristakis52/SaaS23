import './App.css';
import { Routes , Route } from 'react-router-dom';
import Home from './Components/Pages/HomePage/HomePage';
import Layout from './Components/Layout/Layout';
import classes from './Components/Layout/Layout.module.css';
import About from './Components/Pages/AboutPage/AboutPage';
function App() {
  return (
    <div>
      <Layout classname={classes.Layout}>
        <Routes>
        <Route path="/" exact component={Home} />
        </Routes>
      </Layout> 
    </div>
    
  );
}

export default App; 
