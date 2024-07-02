import Chat from './Chat'
import ChatInput from './ChatInput'
import axios from 'axios'
import {useState,useEffect} from 'react'

const ChatDisplay = ({user,clickedUser})=>{
	const userId = user?.user_id
	const clickedUserId = clickedUser?.user_id
	const [userMessages,setuserMessages] = useState(null)
	const [clickedUserMessages,setClickedUserMessages] = useState(null)
	const getUserMessages = async ()=>{
		try{const response = await axios.get('http://localhost:8000/messages',{
					params:{userId:userId,correspondingUserId:clickedUserId}
				})
				setuserMessages(response.data)}
		catch(err){
			console.log(err)
		}
	} 

	const getClickedUserMessages = async ()=>{
		try{const response = await axios.get('http://localhost:8000/messages',{
					params:{userId:clickedUserId,correspondingUserId:userId}
				})
				setClickedUserMessages(response.data)}
		catch(err){
			console.log(err)
		}
	} 

	useEffect(()=>{
		getUserMessages()
		getClickedUserMessages()
	},[userMessages,clickedUserMessages])
	const messages = []

	userMessages?.forEach(message=>{
		const formattedMessage = {}
		formattedMessage['name']=user?.first_name
		formattedMessage['img']=user?.url1
		formattedMessage['mesage']= message.message
		formattedMessage['timestamp'] = message.timestamp
		messages.push(formattedMessage)
	})

	clickedUserMessages?.forEach(message=>{
		const formattedMessage = {}
		formattedMessage['name']=clickedUser?.first_name
		formattedMessage['img']=clickedUser?.url1
		formattedMessage['mesage']= message.message
		formattedMessage['timestamp'] = message.timestamp
		messages.push(formattedMessage)
	})

	const desendingOrder = messages?.sort((a,b)=>{return new Date(b.timestamp) - new Date(a.timestamp);})
	
	return <div>
		<Chat desendingOrder={desendingOrder}/>
		<ChatInput user={user} clickedUser={clickedUser} getUserMessages={getUserMessages} getClickedUserMessages={getClickedUserMessages}/>
	</div>
}

export default ChatDisplay