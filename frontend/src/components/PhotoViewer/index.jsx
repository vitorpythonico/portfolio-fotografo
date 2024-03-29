import { useContext } from 'react'
import { useLoadDataContext} from '../../contexts/LoadDataContext'

import PhotoCard from '../PhotoCard'
import styles from './PhotoViewer.module.css'


export default function PhotoViewer() {
	const { photos } = useLoadDataContext();

	if (photos)
		return (
			<>
				<main className={styles.photoViewer}>
					<div className={styles.pageTitle}>
						<h1>Galeria</h1>
					</div>
					<div className={styles.photoGalery}>
						{
							Object.values(photos).map((photo, id) =>
								<PhotoCard
									key={id}
									src={photo.src}
									description={photo.description}
									date={photo.date}
									place={photo.place}
								/>
							)
						}
					</div>
				</main>
			</>
		)
}