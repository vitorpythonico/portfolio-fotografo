import { useState, useEffect } from 'react'

import { useLoadDataContext } from '../../../../contexts/LoadDataContext'
import PhotoEditor from '../PhotoEditor'
import EditField from '../EditField'
import AddAlbum from './components/AddAlbum'

import styles from './AlbumList.module.css'

export default function AlbumList({ setConfigComponent = f => f}) {
	const {albums, loadingAlbums} = useLoadDataContext();
	const [albumList, setAlbumList] = useState([]);
	
	const openPhotoEditor = (album) => {
		setConfigComponent(< PhotoEditor album={album}/>)
	}

	const removeAlbumFromList = (id) => {
		setAlbumList(prevState => [...prevState.filter(item => item.key !== id) ])
	}

	useEffect(() => {
		if (albums) {
			const indexes = Object.keys(albums)
			setAlbumList(
				indexes.map(album_id => (
					<li key={album_id} className={styles.li}>
						<EditField
							id={album_id}
							content={albums[album_id].name}
							endpoint={`/albums/${album_id}`}
							keyField="new_name"
							clickEvent={openPhotoEditor}
							removeField={removeAlbumFromList}
						/>
					</li>
				))
			)
		}
		
	}, [albums])

	if (!loadingAlbums) return (
		<>
		<h2>Álbuns</h2>
		<AddAlbum addAlbum={setAlbumList} removeAlbumFromList={removeAlbumFromList}/>
		<ul>
			{ albumList }
		</ul>
		</>
	)	
}