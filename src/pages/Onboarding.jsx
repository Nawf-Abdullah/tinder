import {useState} from 'react'
import Nav from '../components/Nav'
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import axios from 'axios' 

const OnBoarding = ()=>{
	let navigate = useNavigate()
	const [cookies,setCookie,removeCookie]=useCookies(['user'])
	const [formData,setFormData] = useState({
		user_id:cookies.UserId,
		first_name:'',
		dob_day:'',
		dob_month:'',
		dob_year:'',
		show_gender:false,
		gender_identity:'',
		gender_interest:'',
		url1:'',
		about:'',
		matches:[]
	})
	// setFormData((prevState)=>({
	// 		...prevState,
	// 		[user_id]:value
	// 	}))
	const handleSubmit = async (e)=>{
		e.preventDefault()
		try{
		const response = await axios.put(`http://localhost:8000/user`,{formData:formData})
		console.log(response)
		const success = response.status ===200;
		console.log('submitted')
		if(success) navigate('/dashboard');
		
	}catch(err){
		console.log(err)
	}
	}

	const handleChange = (e)=>{
		console.log('e',e)
		const value = e.target.type==='checkbox'?e.target.checked:e.target.value;
		const name = e.target.name;
		console.log('value',value);
		console.log('name',name);
		setFormData((prevState)=>({
			...prevState,
			[name]:value
		}))
	}
	console.table(formData)
	return(
		<div>
		<Nav minimal={true} authToken={true} setShowModal={()=>{}} showModal={false}/>
			<div className='onboarding'>
			<h2>Create Account</h2>
			<form onSubmit={handleSubmit}>
				<section>
					<label htmlFor='first_name'>First Name</label>
					<input 
						id="first_name"
						type='text'
						name='first_name'
						placeholder='First Name'
						required={true}
						value={formData.first_name}
						onChange={handleChange}
					/>
					<label>Birthday</label>
					<div className='multiple-input-container'>
					<input 
						id="dob_day"
						type='number'
						name='dob_day'
						placeholder='DD'
						required={true}
						value={formData.dob_day}
						onChange={handleChange}
					/>
					<input 
						id="dob_month"
						type='number'
						name='dob_month'
						placeholder='MM'
						required={true}
						value={formData.dob_month}
						onChange={handleChange}
					/>
					<input 
						id="dob_year"
						type='number'
						name='dob_year'
						placeholder='YYYY'
						required={true}
						value={formData.dob_year}
						onChange={handleChange}
					/></div>
					<label>Gender</label>
					<div className='multiple-input-container'>
						<input 
							id="man-gender-identity"
							type='radio'
							name='gender_identity'
							placeholder='DD'
							value="man"
							onChange={handleChange}
							checked={formData.gender_identity==='man'}
						/>
						<label htmlFor='man-gender-identity'>Man</label>
						<input 
							id="woman-gender-identity"
							type='radio'
							name='gender_identity'
							placeholder='DD'
							value="woman"
							onChange={handleChange}
							checked={formData.gender_identity==='woman'}
						/>
						<label htmlFor='woman-gender-identity'>Woman</label>
					</div>

					<label htmlFor='show-gender'>Show gender on my profile</label>
					<input 
							id="show-gender"
							type='checkbox'
							name='show_gender'
							placeholder='DD'
							onChange={handleChange}
							checked={formData.show_gender}
						/>

					<label>Show me</label>
					<div className='multiple-input-container'>
						<input 
							id="man-gender-interest"
							type='radio'
							name='gender_interest'
							placeholder='DD'
							value="man"
							onChange={handleChange}
							checked={formData.gender_interest==='man'}
						/>
						<label htmlFor='man-gender-interest'>Man</label>
						<input 
							id="woman-gender-interest"
							type='radio'
							name='gender_interest'
							placeholder='DD'
							value="woman"
							onChange={handleChange}
							checked={formData.gender_interest==='woman'}
						/>
						<label htmlFor='woman-gender-interest'>Woman</label>
					</div>
					<label htmlFor='about'>About me</label>
					<input 
						id='about'
						type='text'
						name="about"
						required={true}
						placeholder='I like long walks...'
						value={formData.about}
						onChange={handleChange}
					/>
					<input type='submit'/>
				</section>

				<section>
					<label htmlFor='about'>Profile Photo</label>
					<input type='url' name='url1' id='url1' onChange={handleChange}/>
					<div className="photo-container">
						{formData.url&&<img src={formData.url} alt= 'preview will be shown here'/>}
					</div>
				</section>
			</form>
			</div>
		</div>
		)
}

export default OnBoarding;