function Reportes() {

    const descargar = () => {

        window.open(
            "http://127.0.0.1:8000/api/excel/"
        );

    };

    return (

        <div className="container mt-3">

            <h2>Reportes</h2>

            <button
                className="btn btn-success"
                onClick={descargar}
            >
                Descargar Excel
            </button>

        </div>
    );

}

export default Reportes;