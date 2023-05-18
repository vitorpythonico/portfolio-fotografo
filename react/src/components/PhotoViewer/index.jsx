import './index.css'
import PhotoCard from '../PhotoCard'
import image1 from '../../assets/photos/desert.jpeg'
import image2 from '../../assets/photos/alps train.jpg'
import image3 from '../../assets/photos/antarctica.jpg'
import image4 from '../../assets/photos/city.jpeg'
import image5 from '../../assets/photos/header-moorea.jpg'
import image6 from '../../assets/photos/ocean.jpeg'
import image7 from '../../assets/photos/huacachina-from-air-oasis.jpg'
import image8 from '../../assets/photos/new-work.jpg'
import image9 from '../../assets/photos/earth.jpg'
import image10 from '../../assets/photos/floresta.jpg'

export default function PhotoViewer() {
	return (
		<>
			<main>
				<div className="photo-galery">
					<PhotoCard src={image1}/>
					<PhotoCard src={image2}/>
					<PhotoCard src={image3}/>
					<PhotoCard src={image4}/>
					<PhotoCard src={image5}/>
					<PhotoCard src={image6}/>
					<PhotoCard src={image7}/>
					<PhotoCard src={image8}/>
					<PhotoCard src={image9}/>
					<PhotoCard src={image10}/>
				</div>
			</main>
		</>
	)
}