import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <nav className="navbar-custom d-flex justify-content-between align-items-center">
      <div>
        <h5 className="mb-0">Bienvenido, Administrador</h5>
        <small>Sistema de Préstamos de Equipos</small>
      </div>
      <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
    </nav>
  );
};

export default Navbar;