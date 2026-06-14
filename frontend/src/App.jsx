import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedLayout from './components/ProtectedLayout';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Equipos from './pages/Equipos';
import Personas from './pages/Personas';
import Prestamos from './pages/Prestamos';
import Historial from './pages/Historial';
import Reportes from './pages/Reportes';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/equipos" element={<Equipos />} />
          <Route path="/personas" element={<Personas />} />
          <Route path="/prestamos" element={<Prestamos />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/reportes" element={<Reportes />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;