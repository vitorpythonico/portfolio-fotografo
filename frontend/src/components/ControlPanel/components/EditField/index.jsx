import { useState, useRef } from 'react'
import { api } from '../../../../services/api'

import editIcon from '../../../../assets/icons/edit-icon.svg'
import cancelEditIcon from '../../../../assets/icons/cancel-edit-icon.svg'
import confirmEditIcon from '../../../../assets/icons/confirm-edit-icon.svg'
import trashIcon from '../../../../assets/icons/trash-icon.svg'
import styles from './EditField.module.css'

export default function EditField({
	id,
	content,
	endpoint,
	keyField,
	clickEvent = f => f,
	removeField = f => f
}) {
	const [editing, setEditing] = useState(false);
	const [updatedContent, setUpdatedContent] = useState(content);
	const [msg, setMsg] = useState({});
	const elementRef = useRef();

	const paragraphElement = clickEvent ? <p onClick={() => clickEvent(updatedContent)}>{updatedContent}</p> : <p>{updatedContent}</p> 

	const inputElement = <input ref={elementRef} type="text" defaultValue={updatedContent} />
	const [element, setElement] = useState(paragraphElement);

	const handlerMessages = () => {
    if (Object.keys(msg).length > 0) { 	
    	setTimeout(() => {
	      setMsg({});
	    }, 2000)
    }
    return <p className={msg.type === 'sucess' ? styles.sucessMessage : styles.errorMessage}>{msg.msg}</p>
  }

	const edit = () => {
		setEditing(true)
		setElement(inputElement)
	}

	const confirmEdit = async () => {
		const newContent = elementRef.current.value;
		if (newContent) {
			const response = await api.put(endpoint, {[keyField]: newContent})
			if (response.status === 200) {
				setMsg({
					msg: response.data.msg,
					type: 'sucess'
				})
				setUpdatedContent(newContent)
				setEditing(false)
				setElement(<p>{newContent}</p>)
			}

		} else {
			setMsg({
				msg: 'O campo está vazio',
				type: 'error'
			})
		}

	}

	const cancelEdit = () => {
		setEditing(false)
		setElement(paragraphElement)
	}

	const deleteResource = async () => {
		try {
			const response = await api.delete(endpoint)
			if (response.status === 200) {
				setMsg({
					msg: response.data.msg,
					type: 'sucess'
				})
				removeField ? removeField(id) : null
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
			<div className={styles.container}>
				{ element }
				{
					editing
					? <img onClick={confirmEdit} src={confirmEditIcon} alt="Ícone de confirmar edição do campo" />
					: <img onClick={edit} src={editIcon} alt="Ícone de editar campo" />
				}
				{
					editing 
					?	<img onClick={cancelEdit} src={cancelEditIcon} alt="Ícone de cancelar edição" />
					:	<img onClick={deleteResource} src={trashIcon} alt="ícone de excluir um campo" />
				}
			</div>
			{ handlerMessages()}
		</>
	)
}