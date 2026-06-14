import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const ProtectedLayout = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        <div className="page-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProtectedLayout;