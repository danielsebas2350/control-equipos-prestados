import { useEffect, useState } from 'react';
import api from '../services/axiosConfig';

const Reportes = () => {
  const [data, setData] = useState({ prestamos_por_mes: [], equipos_mas_prestados: [], personas_mas_prestamos: [], resumen: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const prestamosRes = await api.get('/historial/');
        const prestamos = prestamosRes.data;
        const total = prestamos.length;
        const equiposCount = {};
        const personasCount = {};
        const meses = {};
        prestamos.forEach(p => {
          const equipo = p.activo_codigo;
          equiposCount[equipo] = (equiposCount[equipo] || 0) + 1;
          const persona = `${p.responsable_nombre} ${p.responsable_apellidos}`;
          personasCount[persona] = (personasCount[persona] || 0) + 1;
          const fecha = new Date(p.fecha_desde);
          const mesAnio = `${fecha.getFullYear()}-${fecha.getMonth()+1}`;
          meses[mesAnio] = (meses[mesAnio] || 0) + 1;
        });
        setData({
          prestamos_por_mes: Object.entries(meses).slice(-6).map(([k,v])=>({mes:k, cantidad:v})),
          equipos_mas_prestados: Object.entries(equiposCount).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([n,c])=>({nombre:n, cantidad:c})),
          personas_mas_prestamos: Object.entries(personasCount).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([n,c])=>({nombre:n, cantidad:c})),
          resumen: { total }
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReportes();
  }, []);

  if (loading) return <div className="text-center mt-5">Cargando...</div>;

  return (
    <div>
      <h2 className="mb-4">Reportes</h2>
      <div className="row">
        <div className="col-md-4 mb-4"><div className="card bg-primary text-white"><div className="card-body"><h5>Total Préstamos</h5><h2>{data.resumen.total || 0}</h2></div></div></div>
        <div className="col-md-4 mb-4"><div className="card bg-info text-white"><div className="card-body"><h5>Equipos distintos</h5><h2>{data.equipos_mas_prestados.length}</h2></div></div></div>
        <div className="col-md-4 mb-4"><div className="card bg-success text-white"><div className="card-body"><h5>Personas distintas</h5><h2>{data.personas_mas_prestamos.length}</h2></div></div></div>
      </div>
      <div className="row">
        <div className="col-md-6"><div className="card"><div className="card-header">📅 Préstamos por mes</div><div className="card-body"><ul>{data.prestamos_por_mes.map((m,i)=><li key={i}>{m.mes}: {m.cantidad}</li>)}</ul></div></div></div>
        <div className="col-md-6"><div className="card"><div className="card-header">🔧 Equipos más prestados</div><div className="card-body"><ul>{data.equipos_mas_prestados.map((e,i)=><li key={i}>{e.nombre}: {e.cantidad}</li>)}</ul></div></div></div>
      </div>
    </div>
  );
};

export default Reportes;