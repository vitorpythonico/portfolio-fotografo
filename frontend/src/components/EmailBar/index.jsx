import styles from './EmailBar.module.css'
import emailIcon from '../../assets/icon-email.svg'

function EmailBar() {
	return (
		<>
			<header className={styles.emailBar}>
				<div className={styles.content}>
					<img className={styles.emailSvg} src={emailIcon} alt="Email icon" />
					<p id={styles.email}>gabrieloliveirafsociety@gmail.com</p>
				</div>
				<div id={styles.line}></div>
			</header>
		</>
	)
}

export default EmailBar
