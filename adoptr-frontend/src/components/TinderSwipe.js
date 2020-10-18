import React, { useState, useEffect } from "react"
import './TinderSwipe.css';
import TinderCard from 'react-tinder-card';
import axios from "axios";



function TinderSwipe(props) {

    const [animalProfiles, setAnimalProfiles] = useState([]);

    //// BUILD FUNCTION TO FILTER OUT ANIMAL IDS INCLUDED IN THAT  ARRAY IN THE CURRENT USER'S PROFILE, THIS IS IN STATE

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
                    })
                    .catch((err) => {
                        alert(err);
                    });
            })
            .catch((err) => {
                alert(err);
            });
    }, []);


    // const onSwipe = (direction) => {
    //     console.log('You swiped: ' + direction)
    // }

    // const onCardLeftScreen = (myIdentifier) => {
    //     console.log(myIdentifier + ' left the screen')
    // }

    const swiped = (direction, nameToDelete) => {
        // console.log(nameToDelete + ' goes ' + direction)
    }


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

    return (
        <div className='cardContainer'>
            {props.state.account.name}
            {animalProfiles.map((animal) =>
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
    )
};

export default TinderSwipe;