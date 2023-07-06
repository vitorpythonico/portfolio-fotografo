import { useState, useEffect, useRef} from 'react'
import { useLoadDataContext } from '../../../../contexts/LoadDataContext'
import { api } from '../../../../services/api'

import styles from './ChangeAlbum.module.css'

export default function ChangeAlbum({ currentAlbum, endpoint }) {
	const { albums } = useLoadDataContext();
	const [selectAlbums, setSelectAlbums] = useState([]);
	const [msg, setMsg] = useState({});

	const albumRef = useRef();

	useEffect(() => {
		const indexes = Object.keys(albums)
		setSelectAlbums(
			indexes.map(id => (
				albums[id].name === currentAlbum
				?<option selected key={id} value={albums[id].name}>{albums[id].name}</option>
				: <option key={id} value={albums[id].name}>{albums[id].name}</option>
			))
		)
	}, [albums])

	const handlerMessages = () => {
    if (Object.keys(msg).length > 0) {
    	setTimeout(() => {
	      setMsg({});
	    }, 3000)
    }
    return <p className={msg.type === 'sucess' ? styles.sucessMessage : styles.errorMessage}>{msg.msg}</p>
  }

	const changeAlbum = async () => {
		const album_id = albumRef.current.selectedIndex + 1;
		try {
			const response = await api.put(endpoint, { album_id} )
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

	return (
		<div className={styles.container}>
			<select onChange={changeAlbum} className={styles.select} ref={albumRef}>
				{ selectAlbums }
			</select>
			{ handlerMessages() }
		</div>
		)
		
}