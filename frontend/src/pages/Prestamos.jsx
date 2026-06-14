import { useEffect, useState } from 'react';
import api from '../services/axiosConfig';

const Prestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    activo: '',
    responsable: '',
    ubicacion: '',
    fecha_desde: new Date().toISOString().split('T')[0],
    fecha_hasta: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prestamosRes, equiposRes, personasRes, ubicacionesRes] = await Promise.all([
        api.get('/prestamos/'),
        api.get('/equipos-disponibles/'), // solo disponibles
        api.get('/personas/'),
        api.get('/ubicaciones/')
      ]);
      setPrestamos(prestamosRes.data);
      setEquipos(equiposRes.data);
      setPersonas(personasRes.data);
      setUbicaciones(ubicacionesRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setFormData({
      activo: '',
      responsable: '',
      ubicacion: '',
      fecha_desde: new Date().toISOString().split('T')[0],
      fecha_hasta: ''
    });
    setError('');
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/registrar-prestamo/', formData);
      fetchData();
      handleClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar préstamo');
    }
  };

  const handleDevolver = async (id) => {
    if (window.confirm('¿Registrar devolución?')) {
      await api.put(`/devolver/${id}/`);
      fetchData();
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <h2>Préstamos Activos</h2>
        <button className="btn btn-primary" onClick={handleOpenModal}>+ Nuevo Préstamo</button>
      </div>
      <div className="card">
        <div className="card-body table-responsive">
          <table className="table table-hover">
            <thead>
              <tr><th>ID</th><th>Equipo</th><th>Responsable</th><th>Ubicación</th><th>Desde</th><th>Hasta</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {prestamos.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.activo_codigo || p.activo}</td>
                  <td>{p.responsable_nombre} {p.responsable_apellidos}</td>
                  <td>{p.ubicacion_nombre || '-'}</td>
                  <td>{p.fecha_desde}</td>
                  <td>{p.fecha_hasta}</td>
                  <td>
                    <button className="btn btn-sm btn-success" onClick={() => handleDevolver(p.id)}>Devolver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Nuevo Préstamo</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {error && <div className="alert alert-danger">{error}</div>}
                  <select name="activo" className="form-select mb-2" value={formData.activo} onChange={handleChange} required>
                    <option value="">Seleccione equipo</option>
                    {equipos.map(e => <option key={e.id} value={e.id}>{e.marca} {e.modelo} - {e.codigo_interno}</option>)}
                  </select>
                  <select name="responsable" className="form-select mb-2" value={formData.responsable} onChange={handleChange} required>
                    <option value="">Seleccione persona</option>
                    {personas.map(p => <option key={p.ci} value={p.ci}>{p.nombre} {p.apellidos} ({p.ci})</option>)}
                  </select>
                  <select name="ubicacion" className="form-select mb-2" value={formData.ubicacion} onChange={handleChange}>
                    <option value="">Ubicación (opcional)</option>
                    {ubicaciones.map(u => <option key={u.id} value={u.id}>{u.nombre} - {u.edificio}</option>)}
                  </select>
                  <input type="date" name="fecha_desde" className="form-control mb-2" value={formData.fecha_desde} onChange={handleChange} required />
                  <input type="date" name="fecha_hasta" className="form-control mb-2" value={formData.fecha_hasta} onChange={handleChange} required />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancelar</button>
                  <button type="submit" className="btn btn-primary">Registrar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prestamos;