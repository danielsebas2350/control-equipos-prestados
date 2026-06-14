import { useEffect, useState } from 'react';
import api from '../services/axiosConfig';

const Equipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    codigo_interno: '',
    estado: 'disponible',
    tipo: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEquipos();
    fetchTipos();
  }, []);

  const fetchEquipos = async () => {
    try {
      const res = await api.get('/equipos/');
      setEquipos(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTipos = async () => {
    try {
      const res = await api.get('/tipos-equipo/');
      setTipos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (equipo = null) => {
    if (equipo) {
      setEditing(equipo);
      setFormData({
        marca: equipo.marca,
        modelo: equipo.modelo,
        codigo_interno: equipo.codigo_interno,
        estado: equipo.estado,
        tipo: equipo.tipo || ''
      });
    } else {
      setEditing(null);
      setFormData({ marca: '', modelo: '', codigo_interno: '', estado: 'disponible', tipo: '' });
    }
    setError('');
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditing(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/equipos/${editing.id}/`, formData);
      } else {
        await api.post('/equipos/', formData);
      }
      fetchEquipos();
      handleClose();
    } catch (err) {
      setError(err.response?.data?.codigo_interno?.[0] || 'Error al guardar');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar equipo?')) {
      await api.delete(`/equipos/${id}/`);
      fetchEquipos();
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <h2>Equipos</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>+ Nuevo Equipo</button>
      </div>
      <div className="card">
        <div className="card-body table-responsive">
          <table className="table table-hover">
            <thead>
              <tr><th>ID</th><th>Marca</th><th>Modelo</th><th>Código Interno</th><th>Tipo</th><th>Estado</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {equipos.map(eq => (
                <tr key={eq.id}>
                  <td>{eq.id}</td>
                  <td>{eq.marca}</td>
                  <td>{eq.modelo}</td>
                  <td>{eq.codigo_interno}</td>
                  <td>{eq.tipo_nombre || '-'}</td>
                  <td><span className={`badge bg-${eq.estado === 'disponible' ? 'success' : eq.estado === 'prestado' ? 'warning' : 'danger'}`}>{eq.estado}</span></td>
                  <td>
                    <button className="btn btn-sm btn-info me-2" onClick={() => handleOpenModal(eq)}>Editar</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(eq.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>{editing ? 'Editar Equipo' : 'Nuevo Equipo'}</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {error && <div className="alert alert-danger">{error}</div>}
                  <input type="text" name="marca" className="form-control mb-2" placeholder="Marca" value={formData.marca} onChange={handleChange} required />
                  <input type="text" name="modelo" className="form-control mb-2" placeholder="Modelo" value={formData.modelo} onChange={handleChange} required />
                  <input type="text" name="codigo_interno" className="form-control mb-2" placeholder="Código interno" value={formData.codigo_interno} onChange={handleChange} required />
                  <select name="tipo" className="form-select mb-2" value={formData.tipo} onChange={handleChange} required>
                    <option value="">Seleccione tipo</option>
                    {tipos.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
                  </select>
                  <select name="estado" className="form-select mb-2" value={formData.estado} onChange={handleChange}>
                    <option value="disponible">Disponible</option>
                    <option value="prestado">Prestado</option>
                    <option value="mantenimiento">Mantenimiento</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancelar</button>
                  <button type="submit" className="btn btn-primary">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipos;