import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from "axios";

function Messenger(props) {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [chatID, setChatID] = useState([]);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3001/messages/?animalID=${props.animalID}&userID=${props.userID}`)
            .then((response) => {
                const data = response.data
                console.log("AXIOS", data)
                setMessages(data.messages)
                setChatID(data.chatID)
            })
            .catch((err) => {
                alert(err);
            });
    }, [props.animalID, toggle]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(newMessage);

        axios
            .put(`http://localhost:3001/messages/new`, { chatID: chatID, newMessage: newMessage, sender: props.userType })
            .then((response) => {
                console.log("RESPONSE", response);
                setNewMessage("")
                setToggle(!toggle)
            })
            .catch((err) => {
                alert(err);
            });

    }

    return (

        <Card style={{ width: '18rem' }} >

            <Card.Title>Chat with {props.animalName}'s shelter</Card.Title>
            {messages.map(message => <p style={{ color: message.sender === "user" ? 'red' : 'blue' }} >{message.sender === "user" ? `${props.userName}:  ` : `${props.shelterName}:  `}{message.message}</p>)}
            <form onSubmit={handleSubmit}>
                <label>
                    New Message:
                <input
                        name="newMessage"
                        type="text"
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                    />
                </label>
                <button></button>
            </form>
        </Card>
    )
}


export default Messenger;