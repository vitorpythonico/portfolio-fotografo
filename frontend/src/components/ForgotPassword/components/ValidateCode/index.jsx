import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../../services/api'
import styles from '../../ForgotPassword.module.css'

export default function ConfirmCode() {
	const [error, setError] = useState();
	const resetCodeRef = useRef();
	const navigate = useNavigate();

	useEffect(() => {
		const sendEmail = async () => {
			try {
				const response = await api.post('/account/reset_password')
			} catch (AxiosError){
				if (AxiosError.response) {
					setError(AxiosError.response.data.error)
					return
				}
				setError('Ocorreu um erro no servidor')
			}
		}
		sendEmail();

	}, [])

	const handlerError = () => {
		if (error) {
			setTimeout( () => setError(''), 2000)
			return <p className={styles.messageError}>{error}.</p>
		}
	}

	const handlerSubmit = async (e) => {
		e.preventDefault()
		const reset_code = resetCodeRef.current.value
		if (!reset_code) {
			setError('O campo não pode estar em branco')
			return
		}
		try {
			const response = await api.post('/account/validate_reset_code', { reset_code })
			if (response.status === 200) return navigate('/login/redefinir_senha', {state: {'validatedCode': true} })
		} catch (AxiosError) {
			setError(AxiosError.response.data.error)
		}
	}
		return (
		<>
			<div className={styles.container}>
				<div className={styles.card}>
					<div className={styles.cardBox}>
						<h1>Foi enviado um código de acesso para seu <span>email de recuperação</span></h1>
						<form onSubmit={handlerSubmit}>
							<label htmlFor="reset_code">Digite o código:</label>
							<input className={styles.validateCodeInput} ref={resetCodeRef} type="text" />
							<button>
								Continuar
							</button>
							{ handlerError() }
						</form>							
					</div>			
				</div>
			</div>
		</>
	)
}