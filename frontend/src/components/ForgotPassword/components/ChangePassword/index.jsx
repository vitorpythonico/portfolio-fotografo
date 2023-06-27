import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../../services/api'

import styles from '../../ForgotPassword.module.css'
import localStyles from './ChangePassword.module.css'

export default function ChangePassword() {
	const [error, setError] = useState();
	const passwordRef = useRef();
	const repeatPasswordRef = useRef();
	const navigate = useNavigate();

	const handlerError = () => {
		if (error) {
			setTimeout( () => setError(''), 2000)
			return <p className={styles.messageError}>{error}.</p>
		}
	}
	
	const handlerSubmit = async (e) => {
		e.preventDefault();
		const password = passwordRef.current.value;
		const repeatPassword = repeatPasswordRef.current.value;

		if (!password || !repeatPassword) {
			setError('Preencha todos os campos');
			return
		}	

		if (password !== repeatPassword) {
			setError('As duas senhas devem ser iguais');
			return 
		}

		try {
			const response = await api.post('/account/new_password', { password });
			if (response.status === 200) navigate('/login')
		} catch (AxiosError) {
			console.log(AxiosError)
			setError(AxiosError.data.error)
		}
	}
	
	return (
		<>
			<div className={styles.container}>
				<div className={styles.card}>
					<div className={`${styles.cardBox} ${localStyles.cardBox}`}>
						<h1>Digite a nova senha</h1>
						
						{ handlerError() }
						
						<form onSubmit={handlerSubmit}>
							<label htmlFor="">Senha</label>
							<input ref={passwordRef} type="text" />
							<label htmlFor="">Repita</label>
							<input ref={repeatPasswordRef} type="text" />
							<button>
								Continuar
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}