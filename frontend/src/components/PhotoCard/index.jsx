import styles from './PhotoCard.module.css'

export default function PhotoCard( {src, description, date, place} ) {
	const CDN_URL = import.meta.env.VITE_CDN_URL

	return (
	<>
		<div className={styles.container}>
			<div className={styles.photoCard}>
				<img src={CDN_URL + src} alt="photography" />
				<h6 className={styles.description}>
					{description}
				</h6>
				<div className={styles.photoMetadata}>
					<p className={styles.date}>
						{date.day} de {date.month}, {date.year}
					</p>
					<p className={styles.location}>{place}</p>
				</div>
			</div>	
		</div>
	</>
	)
}

