import { useState, useRef } from 'react'
import { api } from '../../../../../../services/api'

import confirmEditIcon from '../../../../../../assets/icons/confirm-edit-icon.svg'
import cancelEditIcon from '../../../../../../assets/icons/cancel-edit-icon.svg'
import styles from '../../PhotoEditor.module.css'

export default function PlaceEditor({id, place }) {
	const [editing, setEditing] = useState(false);
	const [currentPlace, setCurrentPlace] = useState(place);
	const [msg, setMsg] = useState({});

	const newPlaceRef = useRef();

	const handlerMessages = () => {
    if (Object.keys(msg).length > 0) { 	
    	setTimeout(() => {
	      setMsg({});
	    }, 2000)
    }
    return <p className={msg.type === 'sucess' ? styles.sucessMessage : styles.errorMessage}>{msg.msg}</p>
  }

	const edit = () => setEditing(true);

	const cancelEdit = () => setEditing(false);

	const confirmEdit = async () => {
		console.log('chamou')
		try {
			const newPlace = newPlaceRef.current.value;
			if (newPlace) {
				const response = await api.put('/photos/' + id + '/place', 
					{	place: newPlace	}
				);
				if (response.status === 200) {
					setCurrentPlace(newPlace);
					setEditing(false);
					setMsg({
						msg: response.data.msg,
						type: 'sucess'
					})
				}
			}
		} catch (AxiosError) {
			setMsg({
				msg: AxiosError.response.data.error,
				type: 'error'
			})
		}

	}

	return (
		<>
			{
				editing
				? <div className={styles.editPlace}>
						<input ref={newPlaceRef} defaultValue={currentPlace}></input>
						<div className={styles.icons}>
							<img onClick={confirmEdit} className={styles.icon} src={confirmEditIcon} alt="ícone de confirmar edição" />
							<img onClick={cancelEdit} className={styles.icon} src={cancelEditIcon} alt="ícone de cancelar edição" />
						</div>
					</div>
				: <p onClick={edit} className={styles.place}>
						{ currentPlace }
					</p>
			}
			{ handlerMessages() }
			
		</>
	)
}
