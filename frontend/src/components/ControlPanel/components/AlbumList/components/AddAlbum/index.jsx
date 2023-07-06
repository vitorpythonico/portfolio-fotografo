import { useState, useRef } from 'react'
import { api } from '../../../../../../services/api'
import EditField from '../../../EditField'

import confirmEditIcon from '../../../../../../assets/icons/confirm-edit-icon.svg'
import cancelEditIcon from '../../../../../../assets/icons/cancel-edit-icon.svg'
import styles from './AddAlbum.module.css'

export default function AddAlbum({addAlbum, removeAlbumFromList = f => f}) {
	const [editing, setEditing] = useState(false);
	const [msg, setMsg] = useState({});
	const newAlbumRef = useRef();

	const handlerMessages = () => {
    if (Object.keys(msg).length > 0) { 	
    	setTimeout(() => {
	      setMsg({});
	    }, 2000)
    }
    return <p className={msg.type === 'sucess' ? styles.sucessMessage : styles.errorMessage}>{msg.msg}</p>
  }

	const editNewAlbum = () => {
		setEditing(true)
	}

	const cancelEdit = () => {
		setEditing(false)
	}

	const sendNewAlbum = async () => {
		const newAlbum = newAlbumRef.current.value;
		if (newAlbum) {
			try {
				const response = await api.post('/albums/' + newAlbum)
				if (response.status === 200) {
					setMsg({
						msg: response.data.msg,
						type: 'sucess'
					})
					setEditing(false)
					addAlbum(prevState => [
						...prevState,
						<li key={response.data.album_id} className={styles.editField}>
							<EditField 
								id={response.data.album_id}
								content={newAlbum}
								endpoint={`/albums/${response.data.album_id}`}
								keyField="new_name"
								removeField={removeAlbumFromList}
							/>
						</li>
					])
				} 
			} catch (AxiosError) {
					setMsg({
						msg: AxiosError.response.data.error,
						type: 'error'
					})
				}
		} else {
			setMsg({
				msg: 'O campo está vazio',
				type: 'error'
			})
		}
	}

	return (
		<>
			<button onClick={editNewAlbum} className={styles.btn}>
				Adicionar álbum
			</button>
			{ editing
				? (
					<div className={styles.editField}>
						<input ref={newAlbumRef} className={styles.input} type="text" />
						<img onClick={sendNewAlbum} src={confirmEditIcon} alt="ícone de confirmar edição" />
						<img onClick={cancelEdit} src={cancelEditIcon} alt="ícone de cancelar edição" />
					</div>
					)
				: null
			}
			{ handlerMessages() }
		</>
	)
}