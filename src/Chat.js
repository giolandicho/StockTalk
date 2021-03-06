import React, { useState } from 'react'
import "./Chat.css"
import ChatHeader from './ChatHeader';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message';
import { useSelector } from "react-redux";
import { selectUser } from './features/userSlice';
import { selectChannelId, selectChannelName } from './features/appSlice';
import { useEffect } from 'react';
import db from './firebase';
import firebase from "firebase"

function Chat() {

    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(()=>{
        if(channelId){
            db.collection("channels")
            .doc(channelId)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => 
              setMessages(snapshot.docs.map((doc) => doc.data()))
            )
        }
    },[channelId]);

    const sendMessage = e => {
        e.preventDefault()

        db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .add({
            message: input,
            user:user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("")
    };

    return (
        <div className="chat">
            <ChatHeader channelName={channelName}></ChatHeader>
            <div className="chat_messages">
                {messages.map((message)=>(
                    <Message
                    timestamp = {message.timestamp}
                    message = {message.message}
                    user = {message.user}
                    />
                ))}
            </div>
            <div className="chat_input">
                <AddCircleIcon fontSize="large"></AddCircleIcon>
                <form>
                    <input 
                    value = {input}
                    disabled = {!channelId} 
                    onChange={e => setInput(e.target.value)}
                    placeholder={"message #Testing"}>
                    </input>
                    <button 
                    className="chat_input_button" 
                    type="submit"
                    disabled ={!channelId}
                    onClick = {sendMessage}>
                        Send Message
                    </button>
                </form>
                <div className="chat_input_icons">
                    <CardGiftcardIcon fontSize="large"></CardGiftcardIcon>
                    <GifIcon fontSize="large"></GifIcon>
                    <EmojiEmotionsIcon fontSize="large"></EmojiEmotionsIcon>
                </div>
            </div>
        </div>
    )
}

export default Chat;
