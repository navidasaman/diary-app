import './css/index.css';
import './css/Sidebar.css';
import Sidebar from './components/Sidebar'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Contact from './pages/Contact'; 
import Calendar from './pages/Calendar'; 
import Reminders from './pages/Reminders'; 
import Diary from './pages/Diary';
import Home from './pages/Home';
import { useState } from 'react'


function App() {
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () =>{
    setTheme((curr) => (curr === 'dark' ? 'light' : 'dark'));
    console.log('app ' + theme)
  };

  return (
      <div className={`App ${theme}`}  onClick={toggleTheme}>
        <Sidebar /> 
        <BrowserRouter>
          <Routes>
            <Route path="/Home" element={ <Home /> } />
            <Route path="/Diary" element={ <Diary /> } />
            <Route path="/Reminders" element={ <Reminders /> } />
            <Route path="/Contact" element={ <Contact /> } />
            <Route path="/Calendar" element={ <Calendar /> } />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
