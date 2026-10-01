import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initializeStorage } from './services/storage';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register'; // Import new Register page
import Dashboard from './pages/Dashboard';
import Villages from './pages/Villages';
import Farmers from './pages/Farmers';
import Agriculture from './pages/Agriculture';
import Resources from './pages/Resources';
import DataAnalysis from './pages/DataAnalysis';
import SearchFilter from './pages/SearchFilter';

export default function App() {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="villages" element={<Villages />} />
            <Route path="farmers" element={<Farmers />} />
            <Route path="agriculture" element={<Agriculture />} />
            <Route path="resources" element={<Resources />} />
            <Route path="analysis" element={<DataAnalysis />} />
            <Route path="search" element={<SearchFilter />} />
            <Route path="*" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}