import React, {useEffect} from 'react';
import Chat from './Chat';
import Sidebar from './Sidebar';
import './App.css';
import { useSelector,useDispatch } from "react-redux";
import { selectUser } from "./features/userSlice"
import Login from './Login';
import { auth } from './firebase';
import { login, logout } from "./features/userSlice"

function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(
          login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
          })
        )
      }else{
        dispatch(logout())
      }
    })
  },[dispatch])
  return(
    <div className="app">
      { user ? (
        <>
        <Sidebar></Sidebar>
        <Chat></Chat>
        </>
      ):(
        <Login></Login>
      )}
    </div>
  )
}
export default App;
