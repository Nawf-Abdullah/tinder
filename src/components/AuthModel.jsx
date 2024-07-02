import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie' 

const AuthModal = ({setShowModal,isSignUp})=>{

	const [email,setEmail] = useState(null)
	const [password,setPassword] = useState(null)
	const [confirmPassword,setConfirmPassword] = useState(null)
	const [error,setError] = useState(null)
	const [cookies,setCookie,removeCookie]=useCookies(null)
	let navigate = useNavigate()
	console.log(email,password,confirmPassword)
	

	function handleClick()
	{
		setShowModal(false)
	}
	const handleSubmit = async (e)=>
	{
		e.preventDefault()
		try{
			if(isSignUp&&(password!==confirmPassword)){
				setError('Password need to match')
				return
			}else{
				console.log(`http://localhost:8000/${isSignUp?'signup':'login'}`)
			console.log('make a post request')
			const response = await axios.post(`http://localhost:8000/${isSignUp?'signup':'login'}`,{email:email,password:password})
			console.log(response)
			setCookie('UserId',response.data.userId)
			setCookie('AuthToken',response.data.token)
			const success = response.status === 201
			if(success&&isSignUp) navigate('/onboarding')
			if(success&&!isSignUp) navigate('/dashboard')
		}

		}catch (error){
			console.log(error)
		}
	}
	
	return(
		<div className='auth-modal'>
			<div className="close-icon" onClick={handleClick}>x</div>
			<h2>{isSignUp?'Create Account':'LOG IN'}</h2>
			<p>By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie policy</p>
			<form onSubmit={handleSubmit}>
				<input 
					type="email"
					id="email"
					name="email"
					placeholder="email"
					required={true}
					onChange= {e=>setEmail(e.target.value)}
				/>
				<input 
					type="password"
					id="password"
					name="password"
					placeholder="password"
					required={true}
					onChange= {e=>setPassword(e.target.value)}
				/>
				{isSignUp&&<input 
					type="password"
					id="password-check"
					name="password-check"
					placeholder="Confirm password"
					required={true}
					onChange= {e=>setConfirmPassword(e.target.value)}
				/>}
				<input className="secondary-button" type="submit"/>
				<p>{error}</p>
			</form>
			<hr />
			<h2>GET THE APP</h2>
		</div>
		)
}

export default AuthModal
