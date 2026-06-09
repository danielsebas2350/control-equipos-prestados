import { useEffect, useState } from "react";
import api from "../services/api";

function Historial() {

    const [prestamos, setPrestamos] =
        useState([]);

    useEffect(() => {

        cargar();

    }, []);

    const cargar = async () => {

        const res =
            await api.get(
                "historial/"
            );

        setPrestamos(
            res.data
        );

    };

    const devolver = async (id) => {

        await api.put(
            `devolver/${id}/`
        );

        cargar();

        alert(
            "Equipo devuelto"
        );

    };

    return (

        <div className="container mt-3">

            <h2>
                Historial
            </h2>

            <table
                className="table"
            >

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Persona</th>
                        <th>Equipo</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>

                </thead>

                <tbody>

                    {
                        prestamos.map(p => (

                            <tr key={p.id}>

                                <td>
                                    {p.id}
                                </td>

                                <td>
                                    {p.persona_nombre}
                                </td>

                                <td>
                                    {p.equipo_nombre}
                                </td>

                                <td>
                                    {p.estado}
                                </td>

                                <td>

                                    {
                                        p.estado ===
                                        "Prestado" && (

                                            <button
                                                className="btn btn-warning"
                                                onClick={() =>
                                                    devolver(
                                                        p.id
                                                    )
                                                }
                                            >
                                                Devolver
                                            </button>

                                        )
                                    }

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>
    );
}

export default Historial;