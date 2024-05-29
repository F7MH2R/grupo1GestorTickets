import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('https://localhost:7289/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ correo, password })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);

                // Almacenar datos del usuario en localStorage
                localStorage.setItem('user', JSON.stringify(data));
                console.log('Stored user data:', localStorage.getItem('user'));

                // Redirigir según el tipo de usuario
                if (data.tipo_usuario === 1) {
                    navigate('/admin');
                } else if (data.tipo_usuario === 2) {
                    navigate('/empleado');
                } else {
                    navigate('/cliente');
                }
            } else {
                const errorMsg = await response.text();
                setError(errorMsg);
            }
        } catch (error) {
            setError('Failed to connect to the server. Please try again later.');
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Correo</label>
                    <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
