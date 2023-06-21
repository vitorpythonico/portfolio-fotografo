import { createContext, useState, useEffect} from 'react';
import { useFetch } from '../hooks/useFetch'

export const LoadPhotosContext = createContext();

export const LoadPhotosProvider = ({ children }) => {
	const [album, setAlbum] = useState('recentes');
	const [photos, setPhotos] = useState({})
	
	const api_url = 'http://192.168.0.107:5000/api/albums/';
	const {data, error, loading} = useFetch(api_url + album, 'POST')

	const changeAlbum = (e) => setAlbum(e.target.textContent)

	return (
		<LoadPhotosContext.Provider value={{ changeAlbum, data, error, loading }}>
			{children}
		</LoadPhotosContext.Provider>
	)
} 