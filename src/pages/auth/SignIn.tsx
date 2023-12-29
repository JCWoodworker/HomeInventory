import { useState } from "react"
import GoogleOAuth from "./GoogleOAuth"
import axios from "axios"
import Recaptcha from "./Recaptcha"

interface Props {
	backendUrl: string
}

const SignIn: React.FC<Props> = ({ backendUrl }) => {
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	})
	const [loginTokens, setLoginTokens] = useState({
		accessToken: "",
		refreshToken: "",
	})
	const [recaptchaVerified, setRecaptchaVerified] = useState(false)

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		if (recaptchaVerified) {
			const payload = credentials
			try {
				const response = await axios.post(
					`${backendUrl}/authentication/sign-in`,
					payload
				)
				if (response) {
					setLoginTokens(response.data)
				}
			} catch (error) {
				console.log(error)
			}
		} else {
			alert("Please verify that you are not a robot")
		}
	}

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault()
		setCredentials({
			...credentials,
			[event.target.name]: event.target.value,
		})
	}

	console.log(
		`accessToken: ${loginTokens.accessToken}, \nrefreshToken: ${loginTokens.refreshToken}`
	)

	return (
		<div className="GoogleOAuth">
			<h1>Sign In</h1>
			<form className="sign-in-form" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Email"
					name="email"
					value={credentials.email}
					onChange={handleOnChange}
				/>
				<input
					type="password"
					placeholder="Password"
					name="password"
					value={credentials.password}
					onChange={handleOnChange}
				/>
				<Recaptcha setRecaptchaVerified={setRecaptchaVerified} />
				<button type="submit">Sign In</button>
			</form>

			<br />

			<h3>OR</h3>

			<GoogleOAuth />
		</div>
	)
}

export default SignIn
