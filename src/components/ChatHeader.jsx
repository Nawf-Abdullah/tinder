import {useCookies} from 'react-cookie'

const ChatHeader = ({user})=>{
	//var x = user.first_name
	// console.log('At chat header',user)
	 const [cookies,setCookie,removeCookie]=useCookies(['user'])
	 const logout = ()=>{
		removeCookie('UserId',cookies.UserId)
		removeCookie('AuthToken',cookies.AuthToken)
		window.location.reload()
	}
	return <div className='chat-container-header'>
		<div className='profile'>
			<div className='img-container'>
				<img src={user && user.url1} alt={'photo of '}/>
			</div>			
			<h3>{user&&user.first_name}</h3>
		</div>
		<i className='log-out-icon' onClick={logout}>🚀</i>
	</div>
}

export default ChatHeader