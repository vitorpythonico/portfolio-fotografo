import './index.css'
import {useRef, useState } from 'react'

function Aside() {
	const [showMenu, setShowMenu] = useState(true);

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
					<h1>Vitor Gabriel</h1>
					<ul>
						<li><a href="">Recent</a></li>
						<li className="albums">
							<p onClick={showAlbums} href="">Albums</p>
							<ul ref={albumList} className="hidden">
								<li><a href="">Personal</a></li>
								<li><a href="">Travel</a></li>
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