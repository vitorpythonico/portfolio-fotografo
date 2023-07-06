import { api } from '../../../../services/api'
import trashIcon from '../../../../assets/icons/trash-icon.svg'
import styles from './DeleteElement.module.css'

export default function DeleteElement({id, endpoint, deleteElementFn = f => f}) {
	const deleteResource = async () => {
		try {
			const response = await api.delete(endpoint)
			if (response.status === 200) {
				deleteElementFn ? deleteElementFn(id) : null
			}
		} catch (AxiosError) {
		}
	}

	return (
		<>
			<img onClick={deleteResource} className={styles.icon} src={trashIcon} alt="ícone de deletar foto" />
		</>
		)
}