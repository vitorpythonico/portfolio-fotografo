import styles from './PhotoCard.module.css'

export default function PhotoCard( {src, description, date, place} ) {
	const imgCDN = 'http://192.168.0.107:5000/images/'

	return (
	<>
		<div className={styles.container}>
			<div className={styles.photoCard}>
				<img src={imgCDN + src} alt="photography" />
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

