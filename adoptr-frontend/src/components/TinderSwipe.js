import React, { useState, useEffect, useMemo } from "react"
import TinderCard from 'react-tinder-card';
import axios from "axios";
import DistanceSlider from './DistanceSlider.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './TinderSwipe.css';

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

    /// credit: https://www.geodatasource.com
    function distance(crds1, crds2, unit) {
        let lat1 = crds1.latitude
        let lat2 = crds2.latitude
        let lon1 = crds1.longitude
        let lon2 = crds2.longitude
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            const radlat1 = Math.PI * lat1 / 180;
            const radlat2 = Math.PI * lat2 / 180;
            const theta = lon1 - lon2;
            const radtheta = Math.PI * theta / 180;
            let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit == "K") { dist = dist * 1.609344 }
            if (unit == "N") { dist = dist * 0.8684 }
            return dist;
        };
    };





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
            .post(`http://localhost:3001/matches`, { userID: userID, animalID: animalID })
            .then((response) => {
                console.log("MATCH RESPONSE", response);
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
                    <label>
                        Species Shown
                        <select
                        name="species"
                        id="species"
                        onChange={e => setSpeciesSearch(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Critter">Critter</option>
                        </select>
                    </label>
                    <DistanceSlider value={maxDistance} setValue={setMaxDistance} />
                    <label>
                        Fostering?
                        <input
                        name="foster"
                        type="checkbox"
                        checked={foster}
                        onChange={() => setFoster(!foster)}
                        />
                    </label>
                </div>
                <div className='swiping'>
                    <FontAwesomeIcon className="swipe-button red" icon={faTimesCircle} onClick={() => swipe('left')}/> 
                    <div className='cardContainer'>
                        {animalProfiles.length === 0 ? <p>No more Cards</p> : <></>}
                        {filterBySpecies(filterByDistance(filterByFoster(animalProfiles, foster), maxDistance), speciesSearch).map((animal, index) =>
                            <TinderCard
                                ref={childRefs[index]}
                                className='swipe'
                                key={animal._id}
                                onSwipe={(dir) => swiped(dir, animal._id)}
                                onCardLeftScreen={(dir) => outOfFrame(dir, animal._id)}
                                preventSwipe={['up', 'down']}>
                                <div style={{ backgroundImage: 'url(' + animal.url + ')' }} className='card'>
                                    <img className='animalIMG' src={animal.animal_photos[0]} alt='animalPhoto'></img>
                                    <div className="info">
                                    <p>Name: {animal.name}</p>
                                    <p>{distance(animal.coordinates, coordinates, 'K').toFixed(1)} kms away</p>
                                    <p>Species: {animal.species}</p>
                                    <p>Breed: {animal.breedAndInfo.breed}</p>
                                    <p>Foster? {animal.foster ? 'Yes' : 'No'}</p>
                                    <p>Bio: {animal.bio}</p>
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