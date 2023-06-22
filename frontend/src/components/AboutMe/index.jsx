import styles from './AboutMe.module.css'

export default function AboutMe() {
	return (
		<main className={styles.aboutMe}>
			<div className={styles.aboutImg}>
				<div className={styles.aboutImgBox}>
					<div className={styles.welcome}>
						<p>Olá, seja bem-vindo ao meu
							<span> portfolio de fotos.</span>
						</p>
					</div>
					<div className={styles.description}>
						<p>
							Me chamo Vitor e trabalho como fotógrafo há 15 anos, e aqui você encontrará uma coletânea dos meus melhores trabalhos em todos esses anos.<br/>
							<span>Divirta-se.</span>
						</p>
					</div>
				</div>
			</div>
		</main>
	)
}