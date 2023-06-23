import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import styles from './AuthForm.module.css'

export default function AuthForm() {
	const auth = useAuthContext();
	const navigate = useNavigate();

	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState();

	const usernameRef = useRef();
	const passwordRef = useRef();

	const handleUsername = (e) => setUsername(e.target.value)
	const handlePassword = (e) => setPassword(e.target.value)

	const handleLogin = async (e) => {
		e.preventDefault();
		const user = username;
		const pass = password;
		const logged = await auth.login(user, pass);
		if (logged) {
			navigate('/admin')
			return
		} 
		
		setError('Usuário ou senha inválida')
		
	}
	
	return (
		<>
			<div className={styles.container}>
				<div className={styles.loginCard}>
					<div className={styles.loginCardBox}>
						<p>Faça login para ter acesso ao painel</p>
						<form onSubmit={handleLogin} action="" method="POST">
				
								{ error ?	<p className={styles.loginError}>{error}</p> : null }
				
							<label htmlFor="username">Usuário</label>
							<input ref={usernameRef} onChange={handleUsername} id="username" type="text"/>
							<div className={styles.inputPasswordMetadata}>
								<label htmlFor="password">Senha</label>
								<a href="">Esqueci a senha</a>
							</div>
							<input ref={passwordRef} onChange={handlePassword} id="password" type="password"/>
							<button>
								Entrar
							</button>
						</form>
						
					</div>
				</div>
			</div>
		</>
	)	
}