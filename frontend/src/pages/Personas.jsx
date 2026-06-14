import { useEffect, useState } from 'react';
import api from '../services/axiosConfig';

const Personas = () => {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    ci: '',
    nombre: '',
    apellidos: '',
    cargo: '',
    email: '',
    telefono: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPersonas();
  }, []);

  const fetchPersonas = async () => {
    try {
      const res = await api.get('/personas/');
      setPersonas(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (persona = null) => {
    if (persona) {
      setEditing(persona);
      setFormData({
        ci: persona.ci,
        nombre: persona.nombre,
        apellidos: persona.apellidos,
        cargo: persona.cargo,
        email: persona.email,
        telefono: persona.telefono
      });
    } else {
      setEditing(null);
      setFormData({ ci: '', nombre: '', apellidos: '', cargo: '', email: '', telefono: '' });
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
        await api.put(`/personas/${formData.ci}/`, formData);
      } else {
        await api.post('/personas/', formData);
      }
      fetchPersonas();
      handleClose();
    } catch (err) {
      setError('Error al guardar. Verifique CI único o datos.');
    }
  };

  const handleDelete = async (ci) => {
    if (window.confirm('¿Eliminar persona?')) {
      await api.delete(`/personas/${ci}/`);
      fetchPersonas();
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <h2>Personas</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>+ Nueva Persona</button>
      </div>
      <div className="card">
        <div className="card-body table-responsive">
          <table className="table table-hover">
            <thead>
              <tr><th>CI</th><th>Nombre</th><th>Apellidos</th><th>Cargo</th><th>Email</th><th>Teléfono</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {personas.map(p => (
                <tr key={p.ci}>
                  <td>{p.ci}</td>
                  <td>{p.nombre}</td>
                  <td>{p.apellidos}</td>
                  <td>{p.cargo}</td>
                  <td>{p.email}</td>
                  <td>{p.telefono}</td>
                  <td>
                    <button className="btn btn-sm btn-info me-2" onClick={() => handleOpenModal(p)}>Editar</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.ci)}>Eliminar</button>
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
                <h5>{editing ? 'Editar Persona' : 'Nueva Persona'}</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {error && <div className="alert alert-danger">{error}</div>}
                  <input type="text" name="ci" className="form-control mb-2" placeholder="CI (carnet)" value={formData.ci} onChange={handleChange} required disabled={editing} />
                  <input type="text" name="nombre" className="form-control mb-2" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
                  <input type="text" name="apellidos" className="form-control mb-2" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} required />
                  <input type="text" name="cargo" className="form-control mb-2" placeholder="Cargo" value={formData.cargo} onChange={handleChange} required />
                  <input type="email" name="email" className="form-control mb-2" placeholder="Email" value={formData.email} onChange={handleChange} required />
                  <input type="text" name="telefono" className="form-control mb-2" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
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

export default Personas;