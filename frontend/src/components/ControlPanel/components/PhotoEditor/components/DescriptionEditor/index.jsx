import { useState, useRef } from 'react'
import { api } from '../../../../../../services/api'

import confirmEditIcon from '../../../../../../assets/icons/confirm-edit-icon.svg'
import cancelEditIcon from '../../../../../../assets/icons/cancel-edit-icon.svg'
import styles from '../../PhotoEditor.module.css'

export default function DescriptionEditor({id, description}) {
	const [editing, setEditing] = useState(false);
	const [msg, setMsg] = useState({});
	const [currentDescription, setCurrentDescription] = useState(description);
	const newDescriptionRef = useRef();

	const handlerMessages = () => {
    if (Object.keys(msg).length > 0) { 	
    	setTimeout(() => {
	      setMsg({});
	    }, 2000)
    }
    return <p className={msg.type === 'sucess' ? styles.sucessMessage : styles.errorMessage}>{msg.msg}</p>
  }

	const edit = () => setEditing(true);

	const confirmEdit = async () => {
		try {
			const newDescription = newDescriptionRef.current.innerText;
			if (newDescription) {
				const response = await api.put('/photos/' + id + '/description', 
					{	description: newDescription	}
				);
				if (response.status === 200) {
					setCurrentDescription(newDescription);
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

	const cancelEdit = () => setEditing(false);

	return (
		<>
			{
				editing
				? <>
						<div
							ref={newDescriptionRef}
							className={styles.editDescription}
							contentEditable
							suppressContentEditableWarning
						>
							{currentDescription}
						</div>
						<div className={styles.icons}>
							<img onClick={confirmEdit} className={styles.icon} src={confirmEditIcon} alt="ícone de confirmar edição" />
							<img onClick={cancelEdit} className={styles.icon} src={cancelEditIcon} alt="ícone de cancelar edição" />
						</div>
						</>
				: <p onClick={edit} className={styles.description}>
						{ currentDescription }
					</p>
			}
			{ handlerMessages() }
			
		</>
	)
}