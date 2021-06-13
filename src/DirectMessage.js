import React from 'react'
import "./DirectMessage.css"
import { Avatar } from '@material-ui/core';

function DirectMessage() {
    return (
        <div className="sidebar_dm">
            <span className="sidebar_avatar">
                <Avatar sizes="small"></Avatar>
            </span>
            <h4>User</h4>
        </div>
    )
}

export default DirectMessage
