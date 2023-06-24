import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const api = useAuth();
	const [authenticated, setAuthenticated] = useState(
		localStorage.getItem('isAuth')
	)

	useEffect( () => {
			const time = 1000 * 60 * 59;
			api.refreshToken()
			setInterval(api.refreshToken, time);
	}, [])

	const login = async (username, password) => {
		const logged = await api.login(username, password)
		if (logged) {
			setAuthenticated(true)
			return logged
		}
	}

	const logout = () => {
		api.logout()
		setAuthenticated(false)
	}

	return (
		<AuthContext.Provider value={{ authenticated, login, logout }}>
			{ children }
		</AuthContext.Provider>
	)
}

const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuthContext}
