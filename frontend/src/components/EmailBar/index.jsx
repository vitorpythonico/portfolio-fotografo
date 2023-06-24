import { useLoadDataContext } from '../../contexts/LoadDataContext' 
import styles from './EmailBar.module.css'
import emailIcon from '../../assets/icons/icon-email.svg'

function EmailBar() {
	const { profile, loadingProfile } = useLoadDataContext();
	return (
		<>
			<header className={styles.emailBar}>
				<div className={styles.content}>
					<img className={styles.emailSvg} src={emailIcon} alt="Ícone de email" />
					<p id={styles.email}>{ loadingProfile ? null : profile.email }</p>
				</div>
				<div id={styles.line}></div>
			</header>
		</>
	)
}

export default EmailBar
