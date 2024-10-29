import React, {useState} from 'react'
import {useAuth} from '../../context/AuthContext'
import {useNavigate} from 'react-router-dom'

const LoginPage = () => {
	const [username, setUsername] = useState('')
	const {login} = useAuth()
	const navigate = useNavigate()

	const handleLogin = () => {
		login({username})
		navigate('/')
	}

	return (
		<div>
			<h1>Login Page</h1>
			<input
				type="text"
				value={username}
				onChange={e => setUsername(e.target.value)}
				placeholder="Username"
			/>
			<button onClick={handleLogin}>Login</button>
		</div>
	)
}

export default LoginPage
