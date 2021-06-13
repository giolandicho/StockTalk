import React from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications';
import EditLocationRoundedIcon from '@material-ui/icons/EditLocationRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import "./ChatHeader.css"

function ChatHeader({ channelName }) {
    return (
        <div className="chat_header">
            <div className="chat_header_left">
                <h3>
                    <span className="chat_header_hash">
                        $
                    </span>
                    {channelName}
                </h3>
            </div>
            <div className="chat_header_right">
                <NotificationsIcon></NotificationsIcon>
                <EditLocationRoundedIcon></EditLocationRoundedIcon>
                <PeopleAltRoundedIcon></PeopleAltRoundedIcon>
                <div className="chat_header_search">
                    <input placeholder="Search"></input>
                    <SearchRoundedIcon></SearchRoundedIcon>
                </div>
                <SendRoundedIcon></SendRoundedIcon>
                <HelpRoundedIcon></HelpRoundedIcon>
            </div>
        </div>
    )
}

export default ChatHeader
