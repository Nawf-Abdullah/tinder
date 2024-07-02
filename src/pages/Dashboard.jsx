import TinderCard from 'react-tinder-card'
import {useState,useEffect} from 'react'
import ChatContainer from '../components/ChatContainer'
import axios from 'axios'
import {useCookies} from 'react-cookie'

const Dashboard = ()=>{
    const [user,setUser] = useState(null)
    const [genderedUser,setGenderedUsers] = useState(null)
    const [cookies,setCookie,removeCookie]=useCookies(['user'])
    const userId = cookies.UserId  
    const getUser = async ()=>{
      try{
        const response = await axios.get('http://localhost:8000/user',{
          params:{userId}
        })
        setUser(response.data[0])
      }catch(err){
          console.log(err)
      }}
    const getGenderedUsers = async ()=>{
      try{
        const response = await axios.get('http://localhost:8000/gendered-user',{
          params: {gender:user.gender_interest}
        })
        setGenderedUsers(response.data)
      } catch (error){
        console.log(error)
      }}
    useEffect(()=>{
      getUser()
      getGenderedUsers()},[user])
  
    const updateMatches = async (matchedUserId)=>{
      try{ 
        await axios.put('http://localhost:8000/addmatch' ,{params:{userId,matchedUserId}}) 
        getUser()
      }
      catch(err){console.log(err)}  

    }
    const [lastDirection, setLastDirection] = useState()

    const swiped = (direction, swipedUser) => {
      if(direction==='right'){
        updateMatches(swipedUser)
      }
      setLastDirection(direction)
    }

    const outOfFrame = (name) => {
      console.log(name + ' left the screen!')
    }
    const matchedUserIds = user?.matches.map(({user_id})=>user_id).concat(userId)
    const filteredGenderedUsers = genderedUser?.filter(
      usergot => !matchedUserIds.includes(usergot.user_id) 
      )
  	return(
  		<div>{user&&<div className="dashboard">
            <ChatContainer user={user}/>
            <div className="swipe-container">
              <div className="card-container">
                 {genderedUser && genderedUser.map((character) =>
                        <TinderCard className='swipe' key={character.first_name} onSwipe={(dir) => swiped(dir, character.user_id)} onCardLeftScreen={() => outOfFrame(character.first_name)}>
                          <div style={{ backgroundImage: 'url(' + character.url1 + ')' }} className='card'>
                            <h3>{character.first_name}</h3>
                          </div>
                        </TinderCard>
                      )}
                 <div className='swipe-info'>
                   {lastDirection?<p>You swiped {lastDirection}</p>:<p></p>}
                 </div>
              </div>
            </div>
          </div>}</div>
  		)
  }

export default Dashboard