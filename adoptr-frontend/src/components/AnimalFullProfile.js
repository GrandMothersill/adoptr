import Axios from "axios";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Redirect } from "react-router-dom";
import { Card, Button, ListGroup } from 'react-bootstrap';
import distance from '../helpers/distance.js'
import Messenger from './Messenger.js'
import "../styles/AnimalFullProfile.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faMapMarker, faPaw, faSearch } from '@fortawesome/free-solid-svg-icons';
import './TinderSwipe.css';
import TinderCard from 'react-tinder-card';

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
            <div id="animal-matches-chats">
                {/* <Card className="animal-full-profile" key={profile._id}>
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
                </Card > */}


                <div>
                    <div className="swipe-card-profile">
                        <div style={{ backgroundImage: 'url(' + profile.animal_photos + ')' }} className='swipe-photo-profile'>
                        </div>
                        <div className="info-profile">
                            <div className="info-profile-div">
                                <h3>{profile.name}, {profile.sex}, <span style={{ opacity: 0.5 }}>{profile.age} years old</span></h3>
                                <span style={{ marginTop: '.5em' }}>Shelter: <b>{profile.shelter_name}</b></span>
                            </div>
                            <p style={{ marginTop: '-.5em' }}>
                                <div className="info-profile-div">
                                    <span><FontAwesomeIcon className="icon" icon={faMapMarker} /> {distance({ latitude: profile.latitude, longitude: profile.longitude }, coordinates, 'K').toFixed(1)} kms away </span>
                                    <span>Size: <b>{profile.size}</b> </span>
                                </div>
                                <div className="info-profile-div">
                                    <span><FontAwesomeIcon className="icon" icon={faPaw} /> {profile.species} ({profile.breed})</span>
                                    <span>Colour: <b>{profile.colour}</b> </span>
                                </div>
                                <div className="info-profile-div">
                                    <span><FontAwesomeIcon className="icon" icon={faSearch} /> Looking for a forever {profile.foster ? ' or foster ' : ''} home</span>
                                    <span>Spayed/Neudered: <b>{profile.spayedNeudered ? 'Yes' : 'No'}</b></span>
                                </div>
                            </p>
                            <hr></hr>
                            <p style={{ "font-size": "110%", overflow: 'auto', height: '50%', marginTop: '-1em' }}>{profile.bio}</p>
                        </div>
                    </div>
                </div>


                <div>
                    <Messenger userType={props.state.type} userID={props.state.account._id} animalID={profile.id} shelterID={profile.shelter_id} userName={props.state.account.name} animalName={profile.name} shelterName={profile.shelter_name} />
                </div>
            </div >
        )
    }
}

export default AnimalFullProfile;