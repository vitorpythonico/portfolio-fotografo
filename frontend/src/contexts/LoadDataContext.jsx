import { createContext, useState, useEffect} from 'react';
import { useFetch } from '../hooks/useFetch'

export const LoadPhotosContext = createContext();

export const LoadPhotosProvider = ({ children }) => {
	const [album, setAlbum] = useState('recentes');
	
	const API_URL = import.meta.env.VITE_BACKEND_API_URL;
	const { data } = useFetch(API_URL + '/albums/' + album, 'GET');

	const changeAlbum = (e) => setAlbum(e.target.textContent)

	return (
		<LoadPhotosContext.Provider value={{ changeAlbum, data }}>
			{children}
		</LoadPhotosContext.Provider>
	)
} 