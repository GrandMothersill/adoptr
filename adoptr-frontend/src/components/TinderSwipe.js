import React, { useState, useEffect, useMemo } from "react"
import TinderCard from 'react-tinder-card';
import axios from "axios";
import DistanceSlider from './DistanceSlider.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faMapMarker, faPaw, faSearch } from '@fortawesome/free-solid-svg-icons';
import './TinderSwipe.css';
import distance from '../helpers/distance.js'

const alreadyRemoved = []

function TinderSwipe(props) {

    const [animalProfiles, setAnimalProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [speciesSearch, setSpeciesSearch] = useState("All");
    const [coordinates, setCoordinates] = useState({ longitude: null, latitude: null });
    const [maxDistance, setMaxDistance] = useState(101);
    const [foster, setFoster] = useState(false);

    const childRefs = useMemo(() => Array(animalProfiles.length).fill(0).map(i => React.createRef()), [animalProfiles])

    const filterRejectedAnimals = (data) => {
        return data.filter(animal => !props.state.rejected_animals.includes(animal._id)).filter(
            animal => !props.userMatches.includes(animal._id)
        )
    };

    let userAccountID = props.state.account._id
    let setUserMatches = props.setUserMatches

    useEffect(() => {

        axios.get(`http://localhost:3001/matches/user/?userID=${userAccountID}`)
            .then((response) => {
                const data = response.data;
                setUserMatches(data.map(entry => entry.animalID))

                return axios.get("http://localhost:3001/animals")
                    .then((response) => {
                        const data = response.data;
                        console.log("filtered animals", filterRejectedAnimals(data))
                        setAnimalProfiles(filterRejectedAnimals(data))
                        setLoading(false)
                    })
                    .catch((err) => {
                        alert(err);
                    });
            })
            .catch((err) => {
                alert(err);
            });
    }, []);


    const coordError = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const coordOptions = {
        enableHighAccuracy: false,
        timeout: 50000,
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



    // const onSwipe = (direction) => {
    //     console.log('You swiped: ' + direction)
    // }

    // const onCardLeftScreen = (myIdentifier) => {
    //     console.log(myIdentifier + ' left the screen')
    // }

    const swiped = (direction, idToDelete) => {
        // console.log(idToDelete + ' goes ' + direction)
        if (!alreadyRemoved.includes(idToDelete)) {
            alreadyRemoved.push(idToDelete)
        }
    };

    const outOfFrame = (direction, animalID) => {
        // console.log(animalID + ' left the screen going ' + direction)
        if (direction === 'left') {
            console.log(animalID + ' WAS REJECTED')
            handleReject(animalID, props.state.account._id)
        } else if (direction === 'right') {
            console.log(animalID + ' WAS MATCHED =D')
            handleMatch(animalID, props.state.account._id)
        }
    }

    const swipe = (dir) => {
        const cardsLeft = animalProfiles.filter(animal => !alreadyRemoved.includes(animal._id))
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1]._id // Find the card object to be removed
            const index = animalProfiles.map(animal => animal._id).indexOf(toBeRemoved) // Find the index of which to make the reference to
            alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
            childRefs[index].current.swipe(dir) // Swipe the card!
        }
    }

    // THIS IS NOT WORKING BECAUSE ANIMAL PROFILES IS NOT REMOVING ANIMALS ONCE THEY ARE PROCESSED


    const filterBySpecies = (animals, query) => {
        if (query === "All") {
            return animals
        } else {
            return animals.filter(animal => animal.species === query)
        };
    };

    const filterByDistance = (animals, query) => {
        if (query == 101) {
            return animals
        } else {
            return animals.filter(animal => distance(animal.coordinates, coordinates, 'K').toFixed(1) <= query)
        };
    };

    const filterByFoster = (animals, query) => {
        if (query == false) {
            return animals
        } else {
            return animals.filter(animal => animal.foster === true)
        };
    };


    const handleMatch = (animalID, userID) => {
        axios
            .put(`http://localhost:3001/matches`, { userID: userID, animalID: animalID })
            .then((response) => {
                console.log("MATCH RESPONSE", response);
                axios
                    .put(`http://localhost:3001/chats/new`, { userID: userID, animalID: animalID, messages: [] })
                    .then((response) => {
                        console.log("chat response new put", response);
                    })
                    .catch((err) => {
                        alert(err);
                    });
            })
            .catch((err) => {
                alert(err);
            });
        props.setNewMatch(animalID)
    }

    const handleReject = (animalID, userID) => {
        axios
            .put(`http://localhost:3001/users/reject`, { userID: userID, animalID: animalID })
            .then((response) => {
                console.log("REJECTION RESPONSE", response);
            })
            .catch((err) => {
                alert(err);
            });
        props.setRejectedAnimal(animalID)
    };






    if (loading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <div className="swipe-container">
                <div className="swipe-filter">
                    <h3 style={{ "padding-bottom": "30px" }}>Filter By:</h3>
                    <label className="filter">
                        Species <select
                            name="species"
                            id="species"
                            onChange={e => setSpeciesSearch(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Critter">Critter</option>
                        </select>
                    </label>
                    <DistanceSlider value={maxDistance} setValue={setMaxDistance} />
                    <label className="filter">
                        Fostering? <input
                            name="foster"
                            type="checkbox"
                            checked={foster}
                            onChange={() => setFoster(!foster)} />
                    </label>
                </div>
                <div className='swiping'>
                    <FontAwesomeIcon className="swipe-button red" icon={faTimesCircle} onClick={() => swipe('left')} />
                    <div className='swipe-card-container'>
                        {animalProfiles.length === 0 ? <p>No more Cards</p> : <></>}
                        {filterBySpecies(filterByDistance(filterByFoster(animalProfiles, foster), maxDistance), speciesSearch).map((animal, index) =>
                            <TinderCard
                                ref={childRefs[index]}
                                className='swipe'
                                key={animal._id}
                                onSwipe={(dir) => swiped(dir, animal._id)}
                                onCardLeftScreen={(dir) => outOfFrame(dir, animal._id)}
                                preventSwipe={['up', 'down']}>
                                <div className="swipe-card">
                                    <div style={{ backgroundImage: 'url(' + animal.animal_photos[0] + ')' }} className='swipe-photo'>
                                    </div>
                                    <div className="info">
                                        <h3>{animal.name}, <span style={{ opacity: 0.5 }}>{animal.age} years old</span></h3>
                                        <p><FontAwesomeIcon className="icon" icon={faMapMarker} /> {distance(animal.coordinates, coordinates, 'K').toFixed(1)} kms away
                                        <br />
                                            <FontAwesomeIcon className="icon" icon={faPaw} /> {animal.species} ({animal.breedAndInfo.breed})
                                        <br />
                                            <FontAwesomeIcon className="icon" icon={faSearch} /> Looking for a forever home {animal.foster ? 'or loving temporary home' : ''}</p>
                                        <p style={{ "font-size": "120%", overflow: 'auto', maxHeight: '10rem', marginBottom: '-1rem' }}>{animal.bio}</p>
                                    </div>
                                </div>

                            </TinderCard>
                        )}
                    </div>
                    <FontAwesomeIcon className="swipe-button green" icon={faCheckCircle} onClick={() => swipe('right')} />
                </div>
            </div>
        )
    };
};

export default TinderSwipe;