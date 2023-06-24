import emailIcon from '../../../../assets/icons/icon-email.svg'
import instagramIcon from '../../../../assets/icons/icon-instagram.svg'
import whatsappIcon from '../../../../assets/icons/icon-whatsapp.svg'
import cdnIcon from '../../../../assets/icons/cdn-icon.svg'

import Field from '../Field'
import styles from '../../ControlPanel.module.css'

export default function Panel() {
	return (
		<>
			<div className={styles.content}>
				<h1>Painel</h1>
				<div className={styles.configBox}>
					<h2>Informações pessoais</h2>
					<div className={styles.divisory}></div>
					<Field icon={emailIcon} name="Email" value="novoemail@gmail.com"/>
					<Field icon={instagramIcon} name="Instagram" value="https://www.instagram.com/batalhadaaldeia/"/>
					<Field icon={whatsappIcon} name="Whatsapp" value="https://chat.whatsapp.com/ELW3pMzZ9L4Gwspkj6nKqW"/>
				</div>
				<div className={styles.configBox}>
					<h2>Fotos</h2>
					<div className={styles.divisory}></div>
					<Field icon={cdnIcon} name="Servidor" value="images/"/>
					<div className={styles.upload}></div>
				</div>
			</div>
		</>
	)
}