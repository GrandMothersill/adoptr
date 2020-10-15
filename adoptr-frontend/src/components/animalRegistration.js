import React, { useState } from 'react';
import axios from "axios";

function AnimalRegistration(props) {
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [sex, setSex] = useState("male");
    const [age, setAge] = useState("");
    const [animalPhoto, setAnimalPhoto] = useState("");
    const [bio, setBio] = useState("");
    const [breed, setBreed] = useState("");
    const [colour, setColour] = useState("");
    const [size, setSize] = useState("");
    const [spayedNeudered, setSpayedNeudered] = useState(false);
    const [foster, setFoster] = useState(false);

    // const handleSexChange = (event) => {
    //     const name = event.target.value;
    //     setSex(name);
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (props.state.type === 'shelter') {

            const registrationData = {
                name: name,
                species: species,
                sex: sex,
                age: age,
                animal_photos: [animalPhoto],
                bio: bio,
                foster: foster,
                breedAndInfo: {
                    breed: breed,
                    colour: colour,
                    size: size,
                    spayedNeudered: spayedNeudered
                },
                shelterInfo: {
                    shelter_id: props.state.account.name,
                    shelter_name: props.state.account._id
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
        } else {
            alert("You must be logged-in as a shelter to create a new animal profile.")
        }
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
                Sex
                    <select
                    name="sex"
                    id="sex"
                    onChange={e => setSex(e.target.value)}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
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
                Bio:
                <input
                    name="bio"
                    type="text"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Breed:
                <input
                    name="breed"
                    type="text"
                    value={breed}
                    onChange={e => setBreed(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Colour:
                <input
                    name="colour"
                    type="text"
                    value={colour}
                    onChange={e => setColour(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Size:
                <input
                    name="size"
                    type="text"
                    value={size}
                    onChange={e => setSize(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Spayed/Neudered?
                <input
                    name="spayedNeudered"
                    type="checkbox"
                    checked={spayedNeudered}
                    onChange={() => setSpayedNeudered(!spayedNeudered)}
                />
            </label>
            <br></br>
            <label>
                Fostering?
                <input
                    name="foster"
                    type="checkbox"
                    checked={foster}
                    onChange={() => setFoster(!foster)}
                />
            </label>
            <br></br>
            <button>Submit</button>
        </form>
    );
}

export default AnimalRegistration;
