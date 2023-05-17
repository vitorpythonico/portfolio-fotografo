import './index.css'
import instagramIcon from '../../assets/icon-instagram.svg'
import whatsappIcon from '../../assets/icon-whatsapp.svg'

import {useRef} from 'react'

function Aside() {
	const albumList = useRef();

	const showAlbums = () => {
		albumList.current.classList.toggle('hidden')
	}

	return (
		<>
			<aside className="aside">
				<div className="aside-items">
					<h1>Vitor Gabriel</h1>
					<ul>
						<li><a href="#">Recent</a></li>
						<li className="albums">
							<p onClick={showAlbums} href="">Albums</p>
							<ul ref={albumList} className="hidden">
								<li><a href="#">Personal</a></li>
								<li><a href="#">Travel</a></li>
							</ul>
						</li>
						<li><a href="#">About me</a></li>
					</ul>
				</div>
				<div className="social-links">
					<img className="svg-images" src={instagramIcon} alt="instagram icon" />
					<img className="svg-images" src={whatsappIcon} alt="whatsapp icon" />
				</div>
				
			</aside>
		</>
	)
}

export default Aside