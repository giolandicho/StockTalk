import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import CallIcon from '@material-ui/icons/Call';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Avatar } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import DirectMessage from './DirectMessage';
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import db, { auth } from "./firebase"


function Sidebar() {
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);

    useEffect(()=>{
      db.collection("channels").onSnapshot((snapshot) =>
          setChannels(
            snapshot.docs.map((doc) => ({
             id: doc.id,
             channel: doc.data(), 
          }))
        )
      )  
    }, []);

    const handleAddChannel = () =>{
        const channelName = prompt("Add to Watchlist");
       
        if(channelName){
            db.collection("channels").add({
                channelName: channelName,
            })   
        }
    }

    return (
        <div className="sidebar">
    
            <div className="sidebar_top">
                <h3>Bam Adobobayo</h3>
                <ExpandMoreIcon></ExpandMoreIcon>
            </div>
            <div className="sidebar_channe ls">
                <div className="sidebar_channelsHeader">
                    <div className="sidebar_header">
                        <ExpandMoreIcon></ExpandMoreIcon>
                        <h4>Watchlist</h4>
                    </div>
                    <AddIcon onClick = {handleAddChannel} className="sidebar_addChannel"></AddIcon>
                </div>
                <div className="sidebar_channelsList">
                   {channels.map(({ id, channel}) => (
                       <SidebarChannel
                        key = {id}
                        id = {id}
                        channelName = {channel.channelName}
                       />
                   ))}

                </div>
            </div>
            <div className="sidebar_dms">
                <div className="sidebar_dms_header">
                    <div className="sidebar_direct_messages">
                        <ExpandMoreIcon></ExpandMoreIcon>
                        <h4>Direct Messages</h4>
                    </div>
                    <AddIcon className="sidebar_add_dm"></AddIcon>
                </div>
                <div className="sidebar_dms_list">
                    <DirectMessage/>
                    <DirectMessage/>
                    <DirectMessage/>
                    <DirectMessage/>
                </div>
            </div>
            <div className="sidebar_voice">
                <SignalCellularAltIcon
                    className="sidebar_voiceIcon"
                    fontSize="large">
                </SignalCellularAltIcon>
                <div className="sidebar_voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar_voiceIcons">
                    <InfoOutlinedIcon></InfoOutlinedIcon>
                    <CallIcon></CallIcon>
                </div>
            </div>
            <div className="sidebar_profile">
                <Avatar onClick={()=>auth.signOut()} src={user.photo}></Avatar>
                <div className="sidebar_profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0,5)}</p>
                </div>
                <div className="sidebar_profileIcons">
                    <MicIcon></MicIcon>
                    <HeadsetIcon></HeadsetIcon>
                    <SettingsIcon></SettingsIcon>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
