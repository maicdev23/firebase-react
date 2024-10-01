import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div>
            <h1>Registro de Usuario</h1>
            <RegisterForm />
            <p>¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link></p>
        </div>
    );
};

export default Register;