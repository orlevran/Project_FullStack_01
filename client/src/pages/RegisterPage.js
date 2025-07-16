import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try{
            const res = await fetch('http://localhost:5000/api/register',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                }
            );

            const data = await res.json();

            if(res.ok){
                const login_res = await fetch('http://localhost:5000/api/login',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            username: formData.username,
                            password: formData.password
                        })
                    }
                );

                const login_data = await login_res.json();

                if(login_res.ok) {
                    localStorage.setItem('user', JSON.stringify(login_data.user));
                    navigate('/'); // Redirect to home page
                } else{
                    setError(login_data.error || 'Login failed');
                }
            } else {
                setError(data.error || 'Registration failed');
            }
        }
        catch(error) {
            console.error(error);
            setError('Server error');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder='Username' value={formData.username} onChange={handleChange} required /><br/><br/>
                <input name="firstName" placeholder='First Name' value={formData.firstName} onChange={handleChange} required /><br/><br/>
                <input name="lastName" placeholder='Last Name' value={formData.lastName} onChange={handleChange} required /><br/><br/>
                <input name="email" type="email" placeholder='Email' value={formData.email} onChange={handleChange} required /><br/><br/>
                <input name="password" type="password" placeholder='Password' value={formData.password} onChange={handleChange} required /><br/><br/>
                <button type="submit">Register</button>
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    );
}