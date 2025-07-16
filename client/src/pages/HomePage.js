import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function HomePage() {
  return null; // or <div></div> if needed
}


/*
const HomePage = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const firstName = user?.first_name || 'Guest';

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div style = {{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>{user ? 'Welcome, ${user.first_name}' : 'Welcome, Guest'}</h1>
        {user && <button onClick={handleLogout} style={{ padding: '8px 16px', marginRight: '20px' }}>Logout</button>}
        </div>
    );
};
*/

// export default HomePage;