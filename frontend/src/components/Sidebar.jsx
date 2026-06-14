import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="p-3">
        <h4 className="text-white mb-4">📋 Control de Equipos</h4>
        <nav className="nav flex-column">
          <NavLink to="/" className="nav-link" end>📊 Dashboard</NavLink>
          <NavLink to="/equipos" className="nav-link">💻 Equipos</NavLink>
          <NavLink to="/personas" className="nav-link">👥 Personas</NavLink>
          <NavLink to="/prestamos" className="nav-link">🔄 Préstamos</NavLink>
          <NavLink to="/historial" className="nav-link">📜 Historial</NavLink>
          <NavLink to="/reportes" className="nav-link">📈 Reportes</NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;