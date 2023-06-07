import { useState, useEffect } from 'react'

export const useFetch = (url, method) => {
	const [data, setData] = useState()
	const [error, setError] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetch(url, { method: method })
		.then(resp => resp.json())
		.then(setData)
		.catch(setError)
		setLoading(false)
	}, [url])

	return {data, error, loading}
}