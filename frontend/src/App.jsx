import {
 BrowserRouter,
 Routes,
 Route
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Equipos from "./pages/Equipos";

import Personas from "./pages/Personas";
import Prestamos from "./pages/Prestamos";
import Historial from "./pages/Historial";
import Reportes from "./pages/Reportes";

import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {

 return (

  <BrowserRouter>

   <div className="d-flex">

    <Sidebar />

    <div className="flex-grow-1">

      <Navbar />

      <Routes>
        <Route
        path="/"
        element={
          <PrivateRoute>
              <Dashboard />
          </PrivateRoute>
        }
        />

        <Route
         path="/"
         element={<Dashboard />}
        />

        <Route
        path="/equipos"
        element={
          <PrivateRoute>
              <Equipos />
          </PrivateRoute>
        }
        />
        <Route
        path="/personas"
        element={
          <PrivateRoute>
              <Personas />
          </PrivateRoute>
        }
        />

        <Route
        path="/prestamos"
        element={
          <PrivateRoute>
              <Prestamos />
          </PrivateRoute>
        }
        />

        <Route
        path="/historial"
        element={
          <PrivateRoute>
              <Historial />
          </PrivateRoute>
        }
        />

        <Route
        path="/reportes"
        element={
          <PrivateRoute>
              <Reportes />
          </PrivateRoute>
        }
        />
        <Route
        path="/login"
        element={<Login />}
        />

      </Routes>

    </div>

   </div>

  </BrowserRouter>

 );

}

export default App;