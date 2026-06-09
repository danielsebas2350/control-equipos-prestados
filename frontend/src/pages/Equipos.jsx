import { useEffect, useState } from "react";
import api from "../services/api";

function Equipos() {

  const [equipos, setEquipos] = useState([]);

  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {

    const res = await api.get(
      "equipos/"
    );

    setEquipos(res.data);

  };

  const guardar = async () => {

    await api.post(
      "equipos/",
      {
        codigo,
        nombre,
        marca,
        modelo,
        estado: "Disponible"
      }
    );

    cargar();

    setCodigo("");
    setNombre("");
    setMarca("");
    setModelo("");

  };

  const eliminar = async (id) => {

    await api.delete(
      `equipos/${id}/`
    );

    cargar();

  };

  return (

    <div className="container">

      <h2>Equipos</h2>

      <div className="row">

        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Código"
            value={codigo}
            onChange={(e) =>
              setCodigo(e.target.value)
            }
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) =>
              setNombre(e.target.value)
            }
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Marca"
            value={marca}
            onChange={(e) =>
              setMarca(e.target.value)
            }
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Modelo"
            value={modelo}
            onChange={(e) =>
              setModelo(e.target.value)
            }
          />
        </div>

      </div>

      <button
        className="btn btn-success mt-3"
        onClick={guardar}
      >
        Guardar
      </button>

      <table className="table mt-3">

        <thead>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>

        <tbody>

          {
            equipos.map(e => (

              <tr key={e.id}>

                <td>{e.id}</td>
                <td>{e.codigo}</td>
                <td>{e.nombre}</td>
                <td>{e.marca}</td>
                <td>{e.estado}</td>

                <td>

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      eliminar(e.id)
                    }
                  >
                    Eliminar
                  </button>

                </td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </div>

  );

}

export default Equipos;