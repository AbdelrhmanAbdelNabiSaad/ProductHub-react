import { useContext } from 'react'
import './ProtectedRoute.css'
import { AuthContext } from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
    const { currentUser } = useContext(AuthContext);
    if (!currentUser) return <Navigate to='/login' replace />
    return children;
}