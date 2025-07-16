import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({setUser}) {

    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try{

            console.log("LoginPage setUser prop:", setUser); // ✅ Check if it's a function

            const res = await fetch('http://localhost:5000/api/login',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                }
            );

            const data = await res.json();

            if(res.ok){
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                navigate('/'); // Redirect to home page after successful login
            }
            else{
                console.error('[Login Fail]', data);
                setError(data.error || 'Login failed');
            }

        }catch(error){
            console.error('[Network/Server Error]', error);
            setError('Server error');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <br /><br />
                <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <br /><br />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}