import { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext'

import Panel from './components/Panel'
import Account from './components/Account'
import AlbumList from './components/AlbumList'

import panelIcon from '../../assets/icons/panel-icon.svg'
import accountIcon from '../../assets/icons/account-icon.svg'
import exitIcon from '../../assets/icons/exit-icon.svg'

import styles from './ControlPanel.module.css';

export default function ControlPanel() {
	const [configComponent, setConfigComponent] = useState(<Panel />);
	const auth = useAuthContext();

	const handleLogout = () => {
		auth.logout()
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.controlPanelCard}>
					<div className={styles.controlPanel}>
						<div className={styles.controlPanelBox}>
							<div className={styles.generalArea}>
								<h2>Geral</h2>
								<div className={styles.areas}>
									<button onClick={() => setConfigComponent(<Panel/ >)} className={styles.area}>
										<img src={panelIcon} alt="Ícone da área Painel"/>
											<h3>Painel</h3>
									</button>
									
									<button onClick={() => setConfigComponent(<Account/ >)} className={styles.area}>
										<img src={accountIcon} alt="Ícone da área Conta"/>
										<h3>Conta</h3>
									</button>
									<button onClick={handleLogout} className={styles.area}>
										<img src={exitIcon}  alt="Ícone de sair do painel"/>
										<h3>Sair</h3>
									</button>
								</div>
							</div>
							<div className={styles.divisoryAreas}></div>
							<div className={styles.albumListArea}>
								<AlbumList setConfigComponent={setConfigComponent}/>
							</div>
						</div>
					</div>
					<div className={styles.divisory}></div>
					<div className={styles.content}>
						{ configComponent }
					</div>
				</div>
			</div>
		</>
	)	
}