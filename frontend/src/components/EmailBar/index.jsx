import styles from './EmailBar.module.css'
import emailIcon from '../../assets/icons/icon-email.svg'

function EmailBar() {
	return (
		<>
			<header className={styles.emailBar}>
				<div className={styles.content}>
					<img className={styles.emailSvg} src={emailIcon} alt="Ícone de email" />
					<p id={styles.email}>brunoalvesguimaraes@gmail.com</p>
				</div>
				<div id={styles.line}></div>
			</header>
		</>
	)
}

export default EmailBar
