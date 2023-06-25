import { useRef } from 'react'

import { useLoadDataContext } from '../../../../contexts/LoadDataContext'
import { api } from '../../../../services/api'
import Field from '../Field'
import styles from '../../ControlPanel.module.css'

import emailIcon from '../../../../assets/icons/icon-email.svg'
import instagramIcon from '../../../../assets/icons/icon-instagram.svg'
import whatsappIcon from '../../../../assets/icons/icon-whatsapp.svg'
import cdnIcon from '../../../../assets/icons/cdn-icon.svg'

export default function Panel() {
	const { profile, loadingProfile } = useLoadDataContext();

	const emailRef = useRef();
	const instagramRef = useRef();
	const whatsappRef = useRef();
	const cdnRef = useRef();

	const updateProfile = async (setMsg) => {
		const email = emailRef.current.value
		const instagram = instagramRef.current.value
		const whatsapp = whatsappRef.current.value
		const cdn = cdnRef.current.value

		const response = await api.put('/account/profile', { email, instagram, whatsapp, cdn })
		if (response.status == '200') setMsg('Campo atualizado com sucesso!')
	}

	if (!loadingProfile)
	return (
		<>
			<div className={styles.content}>
				<h1>Painel</h1>
				<div className={styles.configBox}>
					<h2>Informações pessoais</h2>
					<div className={styles.divisory}></div>
					<Field ref={emailRef} icon={emailIcon} name="email" value={profile.email} updateFields={updateProfile}/>
					<Field ref={instagramRef} icon={instagramIcon} name="instagram" value={profile.instagram} updateFields={updateProfile}/>
					<Field ref={whatsappRef} icon={whatsappIcon} name="whatsapp" value={profile.whatsapp} updateFields={updateProfile}/>
				</div>
				<div className={styles.configBox}>
					<h2>Fotos</h2>
					<div className={styles.divisory}></div>
					<Field ref={cdnRef} icon={cdnIcon} name="Servidor" value={profile.cdn} updateFields={updateProfile}/>
					<div className={styles.upload}></div>
				</div>
			</div>
		</>
	)
}