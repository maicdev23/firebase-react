import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

const Login = () => {

    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <LoginForm />
            <p>¿No tienes una cuenta? <Link to="/register">Registrar</Link></p>
        </div>
    );
};

export default Login;