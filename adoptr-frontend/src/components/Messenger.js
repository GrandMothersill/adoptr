import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from "axios";

function Messenger(props) {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [chatID, setChatID] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3001/messages/?animalID=${props.animalID}&userID=${props.userID}`)
            .then((response) => {
                const data = response.data
                console.log("AXIOS M", data)
                setMessages(data.messages)
                setChatID(data.chatID)
            })
            .catch((err) => {
            });
    }, [props.animalID, toggle]);


    useEffect(() => {
        axios.get(`http://localhost:3001/user/?userID=${props.userID}`)
            .then((response) => {
                const data = response.data
                setUserName(data.name)
            })
            .catch((err) => {
            });
    }, []);

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

    if (props.userType !== "user" && !messages[0]) {
        return <></>
    } else {

        return (

            <Card style={{ width: '18rem' }} >
                <Card.Title>{props.userType === 'user' ? `Chat with ${props.animalName}'s shelter` : `Chat With ${userName}`}</Card.Title>
                {messages.map(message => <p key={message.timestamp} style={{ color: message.sender === "user" ? 'red' : 'blue' }} >{message.sender === "user" ? `${userName}:  ` : `${props.shelterName}:  `}{message.message}</p>)}
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
}


export default Messenger;