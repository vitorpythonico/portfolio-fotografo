import './index.css'

export default function PhotoCard( {src} ) {
	return (
	<>
		<div className="container">
			<div className="photo-card">
				<img src={src} alt="photography" />
				<h6 className="description">
					Essa foto foi tirada na putaquepariu
				</h6>
				<div className="photo-metadata">
					<p className="date">17 de mai, 2023</p>
					<p className="location">Bora Bora, Polinésia Francesa</p>
				</div>
			</div>	
		</div>
	</>
	)
}

