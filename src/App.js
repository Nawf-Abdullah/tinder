import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Onboarding from './pages/Onboarding'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import {useState,useEffect} from 'react'

function App() {
  const [cookies,setCookie,removeCookie]=useCookies(['user'])
  const [authToken,setAuthToken] = useState(cookies.AuthToken)
  useEffect(()=>{
    setAuthToken(cookies.AuthToken)
  },[cookies.AuthToken])
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />}/>
        {authToken&&<Route path={"/dashboard"} element={<Dashboard />}/>}
        {authToken&&<Route path={"/onboarding"} element={<Onboarding />}/>}
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;