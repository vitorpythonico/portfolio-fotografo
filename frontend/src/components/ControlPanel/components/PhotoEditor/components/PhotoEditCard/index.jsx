import { useLoadDataContext } from '../../../../../../contexts/LoadDataContext'
import DescriptionEditor from '../DescriptionEditor'
import PlaceEditor from '../PlaceEditor'
import EditField from '../../../EditField'
import DeleteElement from '../../../DeleteElement'
import ChangeAlbum from '../../../ChangeAlbum'

import styles from  '../../PhotoEditor.module.css'

export default function PhotoEditCard({id, src, description, place, album, deleteElementFromArray = f => f}){
	const { profile } = useLoadDataContext();

	return (
		<div className={styles.cardContainer}>
			<div className={styles.card}>
				<img src={profile.cdn + src} alt="" />
				<DescriptionEditor id={id} description={description}/>
				<PlaceEditor id={id} place={place}/>
				<div className={styles.features}>
					<ChangeAlbum currentAlbum={album} endpoint={'/photos/' + id + '/album'}/>
					<DeleteElement
						id={id} 
						endpoint={'/photos/' + id}
						deleteElementFn={deleteElementFromArray}
					/>
				</div>
			</div>	
		</div>
	)
}
