import { useEffect, useState } from "react";
import api from "../services/api";

function Prestamos() {

    const [equipos, setEquipos] = useState([]);
    const [personas, setPersonas] = useState([]);

    const [equipo, setEquipo] = useState("");
    const [persona, setPersona] = useState("");

    useEffect(() => {

        cargarEquipos();
        cargarPersonas();

    }, []);

    const cargarEquipos = async () => {

        const res =
            await api.get(
                "equipos-disponibles/"
            );

        setEquipos(res.data);
    };

    const cargarPersonas = async () => {

        const res =
            await api.get("personas/");

        setPersonas(res.data);
    };

    const guardar = async () => {

        await api.post(
            "registrar-prestamo/",
            {
                equipo,
                persona,
                fecha_prestamo:
                    new Date()
                    .toISOString()
                    .split("T")[0],
                estado: "Prestado"
            }
        );

        alert("Préstamo registrado");

        cargarEquipos();
    };

    return (

        <div className="container mt-3">

            <h2>Registrar Préstamo</h2>

            <div className="row">

                <div className="col">

                    <select
                        className="form-control"
                        value={persona}
                        onChange={(e) =>
                            setPersona(
                                e.target.value
                            )
                        }
                    >

                        <option>
                            Seleccione Persona
                        </option>

                        {
                            personas.map(p => (

                                <option
                                    key={p.id}
                                    value={p.id}
                                >
                                    {p.nombre}
                                </option>

                            ))
                        }

                    </select>

                </div>

                <div className="col">

                    <select
                        className="form-control"
                        value={equipo}
                        onChange={(e) =>
                            setEquipo(
                                e.target.value
                            )
                        }
                    >

                        <option>
                            Seleccione Equipo
                        </option>

                        {
                            equipos.map(e => (

                                <option
                                    key={e.id}
                                    value={e.id}
                                >
                                    {e.nombre}
                                </option>

                            ))
                        }

                    </select>

                </div>

            </div>

            <button
                className="btn btn-primary mt-3"
                onClick={guardar}
            >
                Registrar
            </button>

        </div>
    );
}

export default Prestamos;