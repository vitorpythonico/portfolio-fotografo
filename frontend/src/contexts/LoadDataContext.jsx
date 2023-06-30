import { createContext, useState, useEffect, useContext } from 'react';
import { useAxios } from '../hooks/useAxios'

export const LoadDataContext = createContext();

export const LoadDataProvider = ({ children }) => {
	const [currentAlbum, setCurrentAlbum] = useState('recentes');
	const [albums, ,loadingAlbums] = useAxios('/albums', 'GET')
	const [photos, ...restPhotos] = useAxios('/albums/' + currentAlbum, 'GET');
	const [profile, , loadingProfile] = useAxios('/account/profile', 'GET')

	const changeAlbum = (e) => setCurrentAlbum(e.target.textContent)

	return (
		<LoadDataContext.Provider value={{ changeAlbum, albums, loadingAlbums, photos, profile, loadingProfile }}>
			{children}
		</LoadDataContext.Provider>
	)
} 

export const useLoadDataContext = () => useContext(LoadDataContext)