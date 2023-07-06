import { useRef, useState } from 'react';

import { api } from '../../../../services/api'
import { useLoadDataContext } from '../../../../contexts/LoadDataContext';
import Field from '../Field';
import styles from './UploadPhoto.module.css';

export default function IncludePhotoMetadata({filename, setUploaded = f => f}) {
	const [msg, setMsg] = useState({});
	const { albums, loadingAlbums } = useLoadDataContext();
	const selectAlbums = [];

	const descriptionRef = useRef();
	const placeRef = useRef();
	const albumRef = useRef();

	for (const id in albums) {
		selectAlbums.push(<option key={id} value={albums[id].name}>{albums[id].name}</option>)
	}

	const handlerMessages = () => {
    if (Object.keys(msg).length > 0) {
    	setTimeout(() => {
	      setUploaded(true)
	      setMsg({});
	    }, 3000)
    }
    return <p className={msg.type === 'sucess' ? styles.sucessMessage : styles.errorMessage}>{msg.msg}</p>
  }

	const updatePhotoMetadata = async (e) => {
		e.preventDefault();
		const description = descriptionRef.current.value;
		const place = placeRef.current.value;
		const album_id = albumRef.current.selectedIndex + 1;
		try{
			const response = await api.post('/photos/upload/metadata', { filename, description, place, album_id} )
			if (response.status === 200) setMsg({
				msg: response.data.msg,
				type: 'sucess'
			})
		} catch (AxiosError) {
			setMsg({
				msg: AxiosError.response.data.error,
				type: 'error'
			})
		}

	}

	if (!loadingAlbums)
	return (
		<>
			<div className={styles.photoMetadata}>
				<h2>Adicione os dados da foto</h2>
				{ handlerMessages() }
				<form onSubmit={updatePhotoMetadata}>
					<Field ref={descriptionRef} name="Descrição" />
					<Field ref={placeRef} name="Lugar onde foi tirada" />
					<div className={styles.albumSelected}>
						<label htmlFor="album">
							Álbum:
						</label>
						<select ref={albumRef} name="album" id="album">
							{ selectAlbums }
						</select>
					</div>
					<button>
						Salvar
					</button>
				</form>
			</div>
		</>
	)	
}