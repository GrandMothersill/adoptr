import React, { useState, useEffect } from "react";
import { Card, Button, Form } from 'react-bootstrap';

import axios from "axios";
import "../styles/Messenger.css"



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

            <Card className="messenger-card" >
                <Card.Title className="messenger-title">{props.userType === 'user' ? `Message ${props.animalName}'s Shelter` : `Message ${userName}`}</Card.Title>
                <hr className="messenger-line"></hr>
                <div className="messenger-messages-background">
                    {messages.map(message => <Card.Body key={message.timestamp} className={message.sender === props.userType ? 'sent-by-self' : 'sent-by-other'} ><b>{message.sender === "user" ? `${userName}:  ` : `${props.shelterName}:  `}</b>{message.message}</Card.Body>)}
                </div>
                <hr className="messenger-line"></hr>
                <Form className="messenger-form" onSubmit={handleSubmit}>

                    <Card.Subtitle className="messenger-form-label">New Message:</Card.Subtitle>
                    <textarea
                        name="newMessage"
                        type="text"
                        value={newMessage}

                        className="messenger-input"
                        onChange={e => setNewMessage(e.target.value)}
                    />
                    <Button onClick={handleSubmit} className="messenger-form-button" variant="warning">Send</Button>
                </Form>
            </Card>

        )
    }
}


export default Messenger;