import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import CustomerSite from './components/customer/CustomerSite';
import AdminGate from './components/admin/AdminGate';
import AdminPanel from './components/admin/AdminPanel';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<CustomerSite />} />
        <Route
          path="/admin"
          element={
            <AdminGate>
              <AdminPanel />
            </AdminGate>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
