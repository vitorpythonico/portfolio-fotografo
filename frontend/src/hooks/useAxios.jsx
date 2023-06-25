import { useState, useEffect } from 'react'
import { api } from '../services/api'

export const useAxios = (url, method, requestData) => {
	const [data, setData] = useState()
	const [error, setError] = useState()
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const request = async () => {
			try {
				const response = await api(url, { method, requestData })
				setData(response.data)
				setLoading(false)
			} catch (e) {
				setError(e)
			}	
		}
		request()
		
	}, [url])

	return [data, error, loading]
}