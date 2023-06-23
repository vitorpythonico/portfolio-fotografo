import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import AuthForm from '../components/AuthForm'

export default function Login() {
	const { authenticated } = useAuthContext();

	if (authenticated) return <Navigate to="/admin"/>
	
	return <AuthForm />
}