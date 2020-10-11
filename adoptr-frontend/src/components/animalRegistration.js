import React, { useState } from 'react';
import axios from "axios";

function AnimalRegistration(props) {
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [animalPhoto, setAnimalPhoto] = useState("");
    const [bio, setBio] = useState("");
    const [breedAndInfo, setBreedAndInfo] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
        const registrationData = {
            name: name,
            species: species,
            gender: gender,
            age: age,
            animal_photo: animalPhoto,
            bio: bio,
            breedAndInfo: breedAndInfo,
            shelterInfo: {
                shelter_id: 1,
                shelter_name: "Warm Shelter"
            }
        }

        axios
            .post("http://localhost:3001/animals", registrationData)
            .then((response) => {
                console.log("FE response", response);
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Animal</h1>
            <label>
                Name
                <input
                    name="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Species
                <input
                    name="species"
                    type="text"
                    value={species}
                    onChange={e => setSpecies(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Gender
                <input
                    name="gender"
                    type="text"
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Age
                <input
                    name="age"
                    type="text"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Animal Photo:
                <input
                    name="animalPhoto"
                    type="text"
                    value={animalPhoto}
                    onChange={e => setAnimalPhoto(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Shelter Bio:
                <input
                    name="bio"
                    type="text"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Breed Info:
                <input
                    name="breedAndInfo"
                    type="text"
                    value={breedAndInfo}
                    onChange={e => setBreedAndInfo(e.target.value)}
                    required />
            </label>
            <br></br>
            <button>Submit</button>
        </form>
    );
}

export default AnimalRegistration;
