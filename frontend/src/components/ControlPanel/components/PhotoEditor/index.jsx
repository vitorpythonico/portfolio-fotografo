import { useState, useEffect } from 'react'
import { api } from '../../../../services/api'

import PhotoEditCard from './components/PhotoEditCard'
import styles from './PhotoEditor.module.css'

export default function PhotoEditor({ album }) {
	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		const getPhotos = async () => {
			const response = await api.get('/albums/' + album.toLowerCase())
			const photos = response.data;
			const indexes = Object.keys(photos)

			setPhotos(
				indexes.map((index) => (
					<PhotoEditCard
						key={index}
						id={index}
						album={album}
						deleteElementFromArray={deleteElementFromArray}
						{...photos[index]}
					/>
				))
			)
		}
		getPhotos();

	}, [album])

	const deleteElementFromArray = (id) => {
		setPhotos(prevState =>  [...prevState.filter(item => item.key !== id) ])
	}

	return (
		<> 
			<div className={styles.container}>
				<h2>{album}</h2>
				<div className={styles.divisory}></div>
				<div className={styles.photoEditor}>
				{ photos }
				</div>
			</div>
		</>)
}