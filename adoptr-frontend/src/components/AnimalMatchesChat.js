import Axios from "axios";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Redirect } from "react-router-dom";
import { Card, Button, ListGroup } from 'react-bootstrap';
import distance from '../helpers/distance.js'
import Messenger from './Messenger.js'
import "../styles/AnimalMatchesChat.css"

function AnimalMatchesChat(props) {
    let { id, name } = useParams();

    const [matches, setMatches] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/matches/animal/?animalID=${id}`)
            .then((response) => {
                const data = response.data
                console.log("AXIOS", data)
                setMatches(data)
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    if (!props.state.type) {
        return <Redirect to="/" />
    } else {
        return (
            <div id="animal-matches-chats">
                {matches.map(match =>
                    <div className="match-chat" key={match.userID}>
                        <Messenger userType={props.state.type} userID={match.userID} animalID={id} shelterID={props.state.account._id} animalName={name} shelterName={props.state.account.name} />
                    </div>
                )}

            </div>
        )
    }
}

export default AnimalMatchesChat;