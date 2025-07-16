import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return(
    <div className='App'>
      <header className='top-navbar'>
        <Link to="/" className="logo">MyApp</Link>
        <ul className="top-nav-links">
          <li className='welcome-text'>Welcome, {user?.first_name || 'Guest'}</li>
          {user && (
            <li>
              <button onClick={handleLogout} className="nav-button">Logout</button>
            </li>
          )}
          <li><Link to="/register">Register</Link ></li>
          <li><Link to ="/login">Login</Link></li>
        </ul>
      </header>

      <main className='main-content'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage setUser={setUser}/>} />
        </Routes>
      </main>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
