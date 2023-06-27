import { useLocation } from 'react-router-dom'
import ValidateCode from './components/ValidateCode'
import ChangePassword from './components/ChangePassword'

export default function ForgotPassword() {
	const { state } = useLocation();
	if (state) {
		if (state.validatedCode) return <ChangePassword />
	}
	
	return <ValidateCode />
}