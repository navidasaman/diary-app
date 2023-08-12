import './css/index.css';
import Sidebar from './components/Sidebar'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Contact from './pages/Contact'; 


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Sidebar />
      <BrowserRouter>
        <Routes>
          <Route path="/Contact" element={ <Contact /> } />
        </Routes>
      </BrowserRouter>
      </header>      
    </div>
  );
}

export default App;
