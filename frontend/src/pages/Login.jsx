import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const navigate = useNavigate();

    const ingresar = async () => {

        try {

            const res =
                await api.post(
                    "/token/",
                    {
                        username,
                        password
                    }
                );

            localStorage.setItem(
                "token",
                res.data.access
            );

            localStorage.setItem(
                "refresh",
                res.data.refresh
            );

            navigate("/");

        } catch {

            alert(
                "Usuario o contraseña incorrectos"
            );

        }

    };

    return (

        <div
            className="container"
            style={{
                marginTop:"120px",
                maxWidth:"400px"
            }}
        >

            <div className="card p-4">

                <h3>
                    Iniciar Sesión
                </h3>

                <input
                    className="form-control mt-3"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e)=>
                        setUsername(
                            e.target.value
                        )
                    }
                />

                <input
                    type="password"
                    className="form-control mt-3"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e)=>
                        setPassword(
                            e.target.value
                        )
                    }
                />

                <button
                    className="btn btn-primary mt-3"
                    onClick={ingresar}
                >
                    Ingresar
                </button>

            </div>

        </div>

    );

}

export default Login;