import Field from '../Field'
import styles from '../../ControlPanel.module.css'

export default function Account() {
	return (
		<>
			<h1>Conta</h1>
			<div className={styles.configBox}>
			<div className={styles.divisory}></div>
				<Field name="Usuário" value="admin" />
				<Field name="Senha" value="admin" />
				<Field name="Email de segurança" value="emailreserva@gmail.com" />
			</div>
		</>
	)
}