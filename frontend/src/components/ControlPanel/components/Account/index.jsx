import { useRef, useState } from 'react'
import { useAxios } from '../../../../hooks/useAxios'
import { api } from '../../../../services/api'

import Field from '../Field'
import styles from '../../ControlPanel.module.css'

export default function Account() {
	const [data, error, loading] = useAxios('/account', 'GET')

	const usernameRef = useRef();
	const passwordRef = useRef();
	const recoveryEmailRef = useRef();

	const updateAccount = async (setMsg) => {
		const username = usernameRef.current.value
		const password = passwordRef.current.value
		const recovery_email = recoveryEmailRef.current.value

		const response = await api.put('/account', { username, password, recovery_email })
		if (response.status == '200') setMsg('Campo atualizado com sucesso!')
	}

	if (!loading)
	return (
		<>
			<h1>Conta</h1>
			<div className={styles.configBox}>
			<div className={styles.divisory}></div>
				<Field ref={usernameRef} name="Usuário" value={data.username} updateFields={updateAccount}/>
				<Field ref={passwordRef} name="Senha" value={data.password} updateFields={updateAccount}/>
				<Field ref={recoveryEmailRef} name="Email de recuperação" value={data.recovery_email} updateFields={updateAccount}/>
			</div>
		</>
	)
}