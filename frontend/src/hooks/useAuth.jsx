import { api }  from '../services/api'

const refreshToken = async () => {
	try {
		if (localStorage.refresh_token) {
			api.defaults.headers['Authorization'] = `Bearer ${localStorage.refresh_token}`;

			const response = await api.post('/account/refresh');
			const token = response.data['access_token'];
			if (token) {
				localStorage.setItem('token', token);
				api.defaults.headers['Authorization'] = `Bearer ${token}`;
			}
		}
	}
	catch {
		localStorage.removeItem('isAuth');
		localStorage.removeItem('token');
		localStorage.removeItem('refresh_token');
	}
}

const login = async (username, password) => {
	try {
		const response = await api.post('/account/login', {
			username, password
		})
		const token = response.data['access_token'];
		const refresh_token = response.data['refresh_token'];

		if (token && refresh_token) {
			api.defaults.headers['Authorization'] = `Bearer ${token}`;
			localStorage.setItem('isAuth', JSON.stringify(true));
			localStorage.setItem('token', token);
			localStorage.setItem('refresh_token', refresh_token);
			return true	
		}
		return false
	}
	catch {
		return false
	}
}

const logout = async () => {
	const response = await api.post('/account/logout');
	// TODO
}

export const useAuth = () => ({ refreshToken, login, logout })
