import colorLogo from '../images/color-logo-tinder.png'
import whiteLogo from '../images/white-logo-tinder.png'

 
const Nav = ({minimal,authToken,setShowModal,showModal,setIsSignUp})=>{
	function handleClick(){
		setShowModal(true)
		setIsSignUp(false)
	}
	authToken= false;
	return(
		<nav>
			<div className='logo-container'>
				<img className="logo" src={minimal?colorLogo:whiteLogo} alt=''/>
		</div>
			{!authToken&&!minimal&&<button 
				className='nav-button'
				onClick={handleClick}
				disabled={showModal}>Log in</button>}
		</nav>
		)
}

export default Nav