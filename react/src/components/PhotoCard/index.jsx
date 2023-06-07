import './index.css'

export default function PhotoCard( { teste, src, description, date, place} ) {
	const imgCDN = 'http://192.168.0.107:5000/images/'

	return (
	<>
		<div className="container">
			<div className="photo-card">
				<img src={imgCDN + src} alt="photography" />
				<h6 className="description">
					{description}
				</h6>
				<div className="photo-metadata">
					<p className="date">
						{date.day} de {date.month}, {date.year}
					</p>
					<p className="location">{place}</p>
				</div>
			</div>	
		</div>
	</>
	)
}

