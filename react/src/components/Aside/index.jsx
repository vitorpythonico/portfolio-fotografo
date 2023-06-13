import {useRef, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
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
					<p className="personal-name">Vitor Gabriel</p>
					<ul>
						<li><Link onClick={changeAlbum} to="/">recentes</Link></li>
						<li className="albums">
							<p onClick={showAlbums}>Álbuns</p>
							<ul ref={albumList} className="hidden">
								<li><Link onClick={changeAlbum} to="/">pessoal</Link></li>
								<li><Link onClick={changeAlbum} to="/">viagem</Link></li>
							</ul>
						</li>
						<li><Link to="/sobre">sobre mim</Link></li>
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