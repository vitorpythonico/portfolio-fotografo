import { createContext, useState, useEffect, useContext } from 'react';
import { useAxios } from '../hooks/useAxios'

export const LoadDataContext = createContext();

export const LoadDataProvider = ({ children }) => {
	const [currentalbum, setCurrentAlbum] = useState('recentes');
	
	const [photos, ...restPhotos] = useAxios('/albums/' + album, 'GET');
	//const albums Fazer a chamada para os álbums 
	const [profile, erroProfile, loadingProfile] = useAxios('/account/profile', 'GET')

	const changeAlbum = (e) => setCurrentAlbum(e.target.textContent)

	return (
		<LoadDataContext.Provider value={{ changeAlbum, photos, profile, loadingProfile }}>
			{children}
		</LoadDataContext.Provider>
	)
} 

export const useLoadDataContext = () => useContext(LoadDataContext)