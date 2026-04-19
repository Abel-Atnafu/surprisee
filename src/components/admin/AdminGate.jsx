import { useAuth } from '../../context/AuthContext';
import Login from './Login';

export default function AdminGate({ children }) {
  const { isAuthed } = useAuth();
  if (!isAuthed) return <Login />;
  return children;
}
