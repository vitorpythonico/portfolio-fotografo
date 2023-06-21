import './index.css'

export default function AboutMe() {
	return (
		<main className="about-me">
			<div className="about-img">
				<div className="about-img-box">
					<div className="welcome">
						<p>Olá, seja bem-vindo ao meu<br/>
							<span className="color-neon">portfolio de fotos.</span>
						</p>
					</div>
					<div className="description">
						<p>
							Me chamo Vitor e trabalho como fotógrafo há 15 anos, e aqui você encontrará uma coletânea dos meus melhores trabalhos em todos esses anos.<br/>
							<span className="color-neon">Divirta-se.</span>
						</p>
					</div>	
				</div>
			</div>
		</main>
	)
}