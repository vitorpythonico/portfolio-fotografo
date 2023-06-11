import {useRef, useState, useContext } from 'react'
import { LoadPhotosContext} from '../../contexts/LoadPhotosContext'

import './index.css'

function Aside() {
	const [showMenu, setShowMenu] = useState(true);
	const { changeAlbum } = useContext(LoadPhotosContext)

	const albumList = useRef();
	const menu = useRef();

	const showAlbums = () => { albumList.current.classList.toggle('hidden') };
	const showMenuToggle = () => {
		document.body.style.overflow = showMenu ? 'hidden' : 'initial';
		menu.current.classList.toggle('on') ;
		setShowMenu(!showMenu);
	};

	return (
		<>
			<aside ref={menu} className="aside">
				<div onClick={showMenuToggle} className="menu-toggle">
					<div className="one"></div>
					<div className="two"></div>
					<div className="three"></div>
				</div>
				<nav>
					<p class="personal-name">Vitor Gabriel</p>
					<ul>
						<li><a onClick={changeAlbum} href="#">recent</a></li>
						<li className="albums">
							<p onClick={showAlbums}>Albums</p>
							<ul ref={albumList} className="hidden">
								<li><a onClick={changeAlbum} href="#">personal</a></li>
								<li><a onClick={changeAlbum} href="#">travel</a></li>
							</ul>
						</li>
						<li><a href="">About me</a></li>
					</ul>
				</nav>
				<div className="socialmedia-links">
					<a id="instagram-icon" className="svg-images" href="#" target="_blank"></a>
					<a id="whatsapp-icon" className="svg-images" href="#" target="_blank"></a>
				</div>
			</aside>
			<div className="divisory"></div>
		</>
	)
}

export default Aside