import './css/index.css';
import Sidebar from './components/Sidebar'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Contact from './pages/Contact'; 
import Calendar from './pages/Calendar'; 
import Reminders from './pages/Reminders'; 
import Diary from './pages/Diary';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Sidebar />
      <BrowserRouter>
        <Routes>
          <Route path="/Diary" element={ <Diary /> } />
          <Route path="/Reminders" element={ <Reminders /> } />
          <Route path="/Contact" element={ <Contact /> } />
          <Route path="/Calendar" element={ <Calendar /> } />
        </Routes>
      </BrowserRouter>
      </header>      
    </div>
  );
}

export default App;
