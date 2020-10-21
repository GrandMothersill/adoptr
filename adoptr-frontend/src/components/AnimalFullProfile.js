import Axios from "axios";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Redirect } from "react-router-dom";
import { Card, Button, ListGroup } from 'react-bootstrap';
import distance from '../helpers/distance.js'
import Messenger from './Messenger.js'

function AnimalFullProfile(props) {
    let { id } = useParams();

    let [profile, setProfile] = useState({})
    const [coordinates, setCoordinates] = useState({ longitude: null, latitude: null });

    useEffect(() => {
        axios.get(`http://localhost:3001/profile/?id=${id}`)
            .then((response) => {
                const data = response.data[0]
                const spreadProfile = {
                    id: data._id,
                    name: data.name,
                    species: data.species,
                    sex: data.sex,
                    age: data.age,
                    animal_photos: data.animal_photos,
                    bio: data.bio,
                    foster: data.foster,
                    breed: data.breedAndInfo.breed,
                    colour: data.breedAndInfo.colour,
                    size: data.breedAndInfo.size,
                    spayedNeudered: data.breedAndInfo.spayedNeudered,
                    shelter_name: data.shelterInfo.shelter_name,
                    shelter_id: data.shelterInfo.shelter_id,
                    latitude: data.coordinates.latitude,
                    longitude: data.coordinates.longitude
                };
                console.log(spreadProfile)
                setProfile(spreadProfile)
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    const coordError = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const coordOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(e => {
            console.log(e.coords.longitude, e.coords.latitude)
            setCoordinates({
                longitude: e.coords.longitude,
                latitude: e.coords.latitude
            });
        }, coordError, coordOptions);
    }, []);


    if (!props.state.type) {
        return <Redirect to="/" />
    } else {

        return (
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '5rem' }}>
                <Card style={{ width: '40rem' }} key={profile._id}>
                    <Card.Img style={{ height: '20rem', width: 'auto' }} variant="top" src={profile.animal_photos} />
                    <Card.Body>
                        <div style={{ display: 'flex' }} >
                            <Card.Title>{profile.name}</Card.Title>
                            <Card.Subtitle style={{ marginLeft: '50%' }}>Shelter: {profile.shelter_name}</Card.Subtitle>
                        </div>
                        <Card.Subtitle>{distance({ latitude: profile.latitude, longitude: profile.longitude }, coordinates, 'K').toFixed(1)} kms away</Card.Subtitle>
                        <Card.Text>{profile.bio} </Card.Text>
                        <div style={{ display: 'flex' }}>
                            <ListGroup style={{ width: '15rem' }} variant="flush">
                                <ListGroup.Item>Species: {profile.species}</ListGroup.Item>
                                <ListGroup.Item>Breed: {profile.breed}</ListGroup.Item>
                                <ListGroup.Item>Sex: {profile.sex}</ListGroup.Item>
                                <ListGroup.Item>Age: {profile.age}</ListGroup.Item>
                            </ListGroup>
                            <ListGroup style={{ width: '15rem' }} variant="flush">
                                <ListGroup.Item>Colour: {profile.colour}</ListGroup.Item>
                                <ListGroup.Item>Size: {profile.size}</ListGroup.Item>
                                <ListGroup.Item>Spayed/Neudered? {profile.spayedNeudered ? 'Yes' : 'No'}</ListGroup.Item>
                                <ListGroup.Item>Foster? {profile.foster ? 'Yes' : 'No'}</ListGroup.Item>
                            </ListGroup>
                        </div>
                    </Card.Body>
                </Card >
                <div id="animal-matches-chats">
                    <div className="match-chat">
                        <Messenger userType={props.state.type} userID={props.state.account._id} animalID={profile.id} shelterID={profile.shelter_id} userName={props.state.account.name} animalName={profile.name} shelterName={profile.shelter_name} />
                    </div>
                </div>
            </div>
        )
    }
}

export default AnimalFullProfile;