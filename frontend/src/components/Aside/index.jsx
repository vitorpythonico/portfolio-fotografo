import {useRef, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useLoadDataContext} from '../../contexts/LoadDataContext'

import styles from './Aside.module.css'

function Aside() {
	const [showMenu, setShowMenu] = useState(true);
	const { changeAlbum, profile, loadingProfile } = useLoadDataContext();

	const albumList = useRef();
	const menu = useRef();

	const showAlbums = () => { albumList.current.classList.toggle(styles.hidden) };
	const showMenuToggle = () => {
		document.body.style.overflow = showMenu ? 'hidden' : 'initial';
		menu.current.classList.toggle(styles.on);
		setShowMenu(!showMenu);
	};

	return (
		<>
			<aside ref={menu} className={styles.aside}>
				<div onClick={showMenuToggle} className={styles.menuToggle}>
					<div className={styles.one}></div>
					<div className={styles.two}></div>
					<div className={styles.three}></div>
				</div>
				<nav>
					<p className={styles.personalName}>Bruno Alves</p>
					<ul>
						<li><Link onClick={changeAlbum} to="/">recentes</Link></li>
						<li className={styles.albums}>
							<p onClick={showAlbums}>Álbuns</p>
							<ul ref={albumList} className={styles.hidden}>
								<li><Link onClick={changeAlbum} to="/">pessoal</Link></li>
								<li><Link onClick={changeAlbum} to="/">viagem</Link></li>
							</ul>
						</li>
						<li><Link to="/sobre">sobre mim</Link></li>
					</ul>
				</nav>
				<div className={styles.socialmediaLinks}>
					<a id={styles.instagramIcon} className={styles.svgImages} href={loadingProfile ? null : profile.instagram} target="_blank"></a>
					<a id={styles.whatsappIcon} className={styles.svgImages} href={loadingProfile ? null : profile.whatsapp} target="_blank"></a>
				</div>
			</aside>
			<div className={styles.divisory}></div>
		</>
	)
}

export default Aside