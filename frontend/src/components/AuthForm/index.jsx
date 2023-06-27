import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
	const errorRef = useRef();

	const handlerUsername = (e) => setUsername(e.target.value)
	const handlerPassword = (e) => setPassword(e.target.value)

	const handlerError = () => {
		if (error) {
			setTimeout( () => setError(''), 2000)
			return <p ref={errorRef} className={styles.loginError}>{error}</p>
		}
	}
	const handlerLogin = async (e) => {
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
						<form onSubmit={handlerLogin} action="" method="POST">
				
								{ handlerError()	}

							<label htmlFor="username">Usuário</label>
							<input ref={usernameRef} onChange={handlerUsername} id="username" type="text"/>
							<div className={styles.inputPasswordMetadata}>
								<label htmlFor="password">Senha</label>
								<Link to="/login/redefinir_senha">Esqueci a senha</Link>
							</div>
							<input ref={passwordRef} onChange={handlerPassword} id="password" type="password"/>
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