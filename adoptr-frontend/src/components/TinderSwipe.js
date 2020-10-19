import React, { useState, useEffect } from "react"
import './TinderSwipe.css';
import TinderCard from 'react-tinder-card';
import axios from "axios";
import DistanceSlider from './DistanceSlider.js'



function TinderSwipe(props) {

    const [animalProfiles, setAnimalProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [speciesSearch, setSpeciesSearch] = useState("All");

    const [coordinates, setCoordinates] = useState({ longitude: null, latitude: null });

    const [value, setValue] = useState(101);

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
                console.log("GETTING USER MATCHES", data)
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

    const swiped = (direction, nameToDelete) => {
        // console.log(nameToDelete + ' goes ' + direction)
    }

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



    const outOfFrame = (direction, animalID) => {
        // console.log(name + ' left the screen going ' + direction)
        if (direction === 'left') {
            console.log(animalID + ' WAS REJECTED')
            handleReject(animalID, props.state.account._id)
        } else if (direction === 'right') {
            console.log(animalID + ' WAS MATCHED =D')
            handleMatch(animalID, props.state.account._id)
        }
    }
    if (loading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <div style={{ margin: '10px' }}>
                <div style={{ display: 'flex' }}>
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
                    <DistanceSlider value={value} setValue={setValue} />
                </div>
                <div className='cardContainer'>

                    {filterBySpecies(filterByDistance(animalProfiles, value), speciesSearch).map((animal) =>
                        <TinderCard
                            className='swipe'
                            key={animal._id}
                            onSwipe={(dir) => swiped(dir, animal._id)}
                            onCardLeftScreen={(dir) => outOfFrame(dir, animal._id)}
                            preventSwipe={['up', 'down']}
                        >
                            <div style={{ backgroundImage: 'url(' + animal.url + ')' }} className='card'>
                                <img className='animalIMG' src={animal.animal_photos[0]} alt='animalPhoto'></img>
                                <p>Name: {animal.name}</p>
                                <p>{distance(animal.coordinates, coordinates, 'K').toFixed(1)} kms away</p>
                                <p>Species: {animal.species}</p>
                                <p>Breed: {animal.breedAndInfo.breed}</p>
                                <p>Sex: {animal.sex}</p>
                                <p>Age: {animal.age}</p>
                                <p>Colour: {animal.breedAndInfo.colour}</p>
                                <p>Size: {animal.breedAndInfo.size}</p>
                                <p>Spayed/Neudered?{animal.breedAndInfo.spayedNeudered ? 'Yes' : 'No'}</p>
                                <p>Foster? {animal.foster ? 'Yes' : 'No'}</p>
                                <p>Shelter Name:{animal.shelterInfo.shelter_name}</p>
                                <p>Bio: {animal.bio}</p>
                            </div>
                        </TinderCard>
                    )}

                </div>
            </div>
        )
    };
};

export default TinderSwipe;