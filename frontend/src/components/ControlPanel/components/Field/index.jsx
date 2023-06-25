import { useState, useRef, forwardRef } from 'react'

import confirmEditIcon from '../../../../assets/icons/confirm-edit-icon.svg'
import styles from './Field.module.css'

const Field = forwardRef(function Field({ icon = null, name, value, updateFields}, ref) {
	const [msg, setMsg] = useState();

	const editFieldRef = useRef();
	const confirmEditIconRef = useRef();

	const handleFocusIn = () => {
		confirmEditIconRef.current.classList.remove(styles.hidden)
	}
	const handleFocusOut = () => {
		confirmEditIconRef.current.classList.add(styles.hidden)
	}

	const handleMsg = () => {
		if (msg) {
			setTimeout( () => setMsg(''), 1500)
			return <p className={styles.sucessMsg}>{msg}</p>
		}
	}

	return (
		<>
			<div className={styles.container}>
				{ icon ?
					<img src={icon} alt={`Ícone de {name}`}/>
					: null
				}
				<label htmlFor={name}>{name}:</label>
				<div
					ref={editFieldRef}
					onFocus={handleFocusIn}
					onBlur={handleFocusOut}
					className={styles.editField}>
					<input
						ref={ref}
						id={name}
						type="text"
						defaultValue={value}/>
					<button className={styles.btn}>
						<img
							onClick={() => updateFields(setMsg)}
							ref={confirmEditIconRef}
							className={styles.hidden}
							src={confirmEditIcon}
							alt="Ícone de editar campo" 
						/>
					</button>
				</div>	
			</div>
			{ handleMsg() }
		</>
	)
})

export default Field