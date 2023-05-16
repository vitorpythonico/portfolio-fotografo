import './index.css'
import emailIcon from '../../assets/icon-email.svg'

export default function EmailBar() {
	return (
		<div className="email-bar">
			<div className="content">
				<img className="svg-images" src={emailIcon} alt="Email icon" />
				<p id="email">gabrieloliveirafsociety@gmail.com</p>
			</div>
			<div id="line"></div>
		</div>
	)
}
