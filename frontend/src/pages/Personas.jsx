import { useEffect, useState } from "react";
import api from "../services/api";

function Personas() {

    const [personas, setPersonas] = useState([]);

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [tipo, setTipo] = useState("Estudiante");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");

    useEffect(() => {
        cargar();
    }, []);

    const cargar = async () => {
        const res = await api.get("personas/");
        setPersonas(res.data);
    };

    const guardar = async () => {

        await api.post("personas/", {
            nombre,
            apellido,
            tipo,
            telefono,
            correo
        });

        cargar();

        setNombre("");
        setApellido("");
        setTelefono("");
        setCorreo("");
    };

    const eliminar = async (id) => {

        await api.delete(
            `personas/${id}/`
        );

        cargar();
    };

    return (
        <div className="container mt-3">

            <h2>Personas</h2>

            <div className="row">

                <div className="col">
                    <input
                        className="form-control"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) =>
                            setNombre(e.target.value)
                        }
                    />
                </div>

                <div className="col">
                    <input
                        className="form-control"
                        placeholder="Apellido"
                        value={apellido}
                        onChange={(e) =>
                            setApellido(e.target.value)
                        }
                    />
                </div>

                <div className="col">

                    <select
                        className="form-control"
                        value={tipo}
                        onChange={(e) =>
                            setTipo(e.target.value)
                        }
                    >
                        <option>Docente</option>
                        <option>Estudiante</option>
                        <option>Administrativo</option>
                    </select>

                </div>

            </div>

            <div className="row mt-2">

                <div className="col">
                    <input
                        className="form-control"
                        placeholder="Telefono"
                        value={telefono}
                        onChange={(e) =>
                            setTelefono(e.target.value)
                        }
                    />
                </div>

                <div className="col">
                    <input
                        className="form-control"
                        placeholder="Correo"
                        value={correo}
                        onChange={(e) =>
                            setCorreo(e.target.value)
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
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Correo</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>

                    {
                        personas.map(p => (

                            <tr key={p.id}>

                                <td>{p.id}</td>

                                <td>
                                    {p.nombre} {p.apellido}
                                </td>

                                <td>{p.tipo}</td>

                                <td>{p.correo}</td>

                                <td>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            eliminar(p.id)
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

export default Personas;