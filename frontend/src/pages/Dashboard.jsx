import { useEffect, useState } from 'react';
import api from '../services/axiosConfig';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_equipos: 0,
    equipos_disponibles: 0,
    equipos_prestados: 0,
    equipos_mantenimiento: 0,
    total_personas: 0,
    prestamos_activos: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/');
        setStats(response.data);
      } catch (error) {
        console.error('Error cargando dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { title: 'Total Equipos', value: stats.total_equipos, color: 'primary', icon: '💻' },
    { title: 'Equipos Disponibles', value: stats.equipos_disponibles, color: 'success', icon: '✅' },
    { title: 'Equipos Prestados', value: stats.equipos_prestados, color: 'warning', icon: '📤' },
    { title: 'En Mantenimiento', value: stats.equipos_mantenimiento, color: 'danger', icon: '🔧' },
    { title: 'Total Personas', value: stats.total_personas, color: 'info', icon: '👥' },
    { title: 'Préstamos Activos', value: stats.prestamos_activos, color: 'dark', icon: '🔄' },
  ];

  if (loading) return <div className="text-center mt-5">Cargando...</div>;

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      <div className="row">
        {cards.map((card, idx) => (
          <div className="col-md-4 col-lg-3 mb-4" key={idx}>
            <div className={`card text-white bg-${card.color} h-100`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title text-uppercase">{card.title}</h6>
                    <h2 className="display-5 fw-bold">{card.value}</h2>
                  </div>
                  <div className="display-1 opacity-50">{card.icon}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;