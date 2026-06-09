import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh"
      }}
    >

      <h4>Control Equipos</h4>

      <hr />

      <ul className="nav flex-column">

        <li className="nav-item">
          <Link
            className="nav-link text-white"
            to="/"
          >
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link text-white"
            to="/equipos"
          >
            Equipos
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link text-white"
            to="/personas"
          >
            Personas
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link text-white"
            to="/prestamos"
          >
            Préstamos
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link text-white"
            to="/historial"
          >
            Historial
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link text-white"
            to="/reportes"
          >
            Reportes
          </Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;