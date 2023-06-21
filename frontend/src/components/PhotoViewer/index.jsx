import { useContext } from 'react'
import { LoadPhotosContext} from '../../contexts/LoadPhotosContext'

import PhotoCard from '../PhotoCard'
import './index.css'

export default function PhotoViewer() {
	const {data, error, loading} = useContext(LoadPhotosContext)

	if (data)
		return (
			<>
				<main className="photo-viewer">
					<div className="page-title">
						<h1>Galeria</h1>
					</div>
					<div className="photo-galery">
						{
							Object.values(data).map((photo, id) =>
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