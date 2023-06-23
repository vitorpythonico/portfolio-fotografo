import { useAuthContext } from '../../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({children}) {
	const { authenticated } = useAuthContext();

	if (authenticated) return children

	return <Navigate to="/login"/>
}