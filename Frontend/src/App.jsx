import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BoardPage from './components/BoardPage';
import HomePage from './components/HomePage';

function App() {

  return (
      
        <Router>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/boards/:id" element={<BoardPage />} />      
          </Routes>
        </Router>
    
  )
}

export default App;
