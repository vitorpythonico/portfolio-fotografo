import { useLoadDataContext } from '../../contexts/LoadDataContext'
import styles from './PhotoCard.module.css'

export default function PhotoCard( {src, description, date, place} ) {
	const { profile, loadingProfile } = useLoadDataContext()

	return (
	<>
		<div className={styles.container}>
			<div className={styles.photoCard}>
				<img src={!loadingProfile ? profile.cdn + src : null} alt="photography" />
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

