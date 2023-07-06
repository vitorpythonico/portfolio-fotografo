import { useEffect, useState, useRef } from 'react'
import { useLoadDataContext } from '../../../../contexts/LoadDataContext'

import trashIcon from '../../../../assets/icons/trash-icon.svg'
import styles from  './PhotoEditor.module.css'

export default function PhotoEditCard({ src, description, place}){
	const { profile, albums, loadingAlbums } = useLoadDataContext();
	const albumRef = useRef();
	const [selectAlbums, setSelectAlbums] = useState([]);
	
	useEffect(() => {
		const indexes = Object.keys(albums)
		setSelectAlbums(
			indexes.map(id => (
				<option key={id} value={albums[id].name}>{albums[id].name}</option>
			))
		)
	}, [albums])

	/*
		mudar álbum
		mudar description
		mudar place
		deletar
	*/
	return (
		<div className={styles.cardContainer}>
			<div className={styles.card}>
				<img src={profile.cdn + src} alt="" />
				<p className={styles.description}>
					{ description }
				</p>
				<p className={styles.place}> {place}</p>
				<div className={styles.features}>
					<select ref={albumRef} name="album" id="album">
						{ selectAlbums }
					</select>
					<img src={trashIcon} alt="ícone de deletar foto" />
				</div>
				
			</div>	
		</div>
		
	)
}
