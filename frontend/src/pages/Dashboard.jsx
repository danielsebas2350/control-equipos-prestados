import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

  const [datos, setDatos] = useState({});

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {

    const res = await api.get(
      "dashboard/"
    );

    setDatos(res.data);

  };

  return (

    <div className="container mt-3">

      <h2>Dashboard</h2>

      <div className="row">

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Total Equipos</h5>
            <h1>{datos.total_equipos}</h1>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Disponibles</h5>
            <h1>{datos.disponibles}</h1>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Prestados</h5>
            <h1>{datos.prestados}</h1>
          </div>
        </div>

      </div>

    </div>

  );

}

export default Dashboard;