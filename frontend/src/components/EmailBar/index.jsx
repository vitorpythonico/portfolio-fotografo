import './index.css'
import emailIcon from '../../assets/icon-email.svg'

function EmailBar() {
	return (
		<>
			<header className="email-bar">
				<div className="content">
					<img className="email-svg" src={emailIcon} alt="Email icon" />
					<p id="email">gabrieloliveirafsociety@gmail.com</p>
				</div>
				<div id="line"></div>
			</header>
		</>
	)
}

export default EmailBar
