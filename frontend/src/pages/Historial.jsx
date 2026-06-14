import { useEffect, useState } from 'react';
import api from '../services/axiosConfig';

const Historial = () => {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const res = await api.get('/historial/');
        setHistorial(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistorial();
  }, []);

  const filtered = historial.filter(item =>
    (item.activo_codigo?.toLowerCase().includes(filter.toLowerCase())) ||
    (item.responsable_nombre?.toLowerCase().includes(filter.toLowerCase()))
  );

  if (loading) return <div className="text-center mt-5">Cargando...</div>;

  return (
    <div>
      <h2 className="mb-4">Historial de Préstamos</h2>
      <div className="card">
        <div className="card-body">
          <input type="text" className="form-control mb-3" placeholder="Buscar por equipo o responsable..." value={filter} onChange={e => setFilter(e.target.value)} />
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr><th>ID</th><th>Equipo</th><th>Responsable</th><th>Ubicación</th><th>Desde</th><th>Hasta</th></tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.activo_codigo}</td>
                    <td>{p.responsable_nombre} {p.responsable_apellidos}</td>
                    <td>{p.ubicacion_nombre || '-'}</td>
                    <td>{p.fecha_desde}</td>
                    <td>{p.fecha_hasta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Historial;