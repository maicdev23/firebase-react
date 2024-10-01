
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, loginWithGoogle } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password); navigate('/');
        } catch (error) {
            alert('Error al iniciar sesión: ' + error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle(); navigate('/');
        } catch (error) {
            alert('Error al iniciar sesión con Google: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Iniciar Sesión</button>
            <button type="button" onClick={handleGoogleLogin}>
                Iniciar Sesión con Google
            </button>
        </form>
    );
};

export default LoginForm;
