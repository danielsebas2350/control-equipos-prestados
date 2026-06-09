import { useNavigate } from "react-router-dom";

function Navbar() {

  return (

    <div className="bg-primary text-white p-3">

      <h3>
        Sistema de Control de Equipos Prestados
      </h3>

    </div>

  );

  const navigate = useNavigate();

  const salir = () => {

      localStorage.removeItem(
            "token"
      );

      localStorage.removeItem(
            "refresh"
      );

      navigate("/login");

    };

    <button
      className="btn btn-light"
      onClick={salir}
      >
      Cerrar Sesión
    </button>

}

export default Navbar;