

const Chat = ({desendingOrder})=>{
	//console.log(desendingOrder,'dfhbdghr\n\n\n\n\n\n\n\n')
	return(
	 <div className='chat-display'>
		{desendingOrder.map((message,_index)=>{
			return (<div key={_index}>
				<div className='chat-message-header'>
					<div className='img-container'>
						<img src={message.img} alt='profile' />
					</div>
					<p>{message.name}</p>
				</div>
				<p>{message.mesage}</p>
			</div>)
		})}
	</div>
	)
}

export default Chat;