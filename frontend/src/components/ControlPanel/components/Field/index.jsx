import { useState, useRef } from 'react'

import confirmEditIcon from '../../../../assets/icons/confirm-edit-icon.svg'
import styles from './Field.module.css'

export default function Field({ icon = null, name, value}) {
	const editFieldRef = useRef();
	const confirmEditIconRef = useRef();

	const handleFocusIn = () => {
		confirmEditIconRef.current.classList.remove(styles.hidden)
	}
	const handleFocusOut = () => {
		confirmEditIconRef.current.classList.add(styles.hidden)
	}

	return (
		<>
			<div className={styles.container}>
				{ icon ?
					<img src={icon} alt={`Ícone de {name}`}/>
					: null
				}
				<p>{name}:</p>
				<div
					ref={editFieldRef}
					onFocus={handleFocusIn}
					onBlur={handleFocusOut}
					className={styles.editField}>
					<input
						type="text"
						defaultValue={value}/>
					<button className={styles.btn}>
						<img
							ref={confirmEditIconRef}
							className={styles.hidden}
							src={confirmEditIcon}
							alt="Ícone de editar campo" 
						/>
					</button>
				</div>	
			</div>
		</>
	)
}