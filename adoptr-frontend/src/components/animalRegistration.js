import React, { useState } from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom"

function AnimalRegistration(props) {
    const [landingRedirect, setLandingRedirect] = useState(false);
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("dog");
    const [sex, setSex] = useState("male");
    const [age, setAge] = useState("");
    const [animalPhoto, setAnimalPhoto] = useState("");
    const [bio, setBio] = useState("");
    const [breed, setBreed] = useState("");
    const [colour, setColour] = useState("");
    const [size, setSize] = useState("small");
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
                    shelter_name: props.state.account.name,
                    shelter_id: props.state.account._id
                }
            }

            axios
                .post("http://localhost:3001/animals", registrationData)
                .then((response) => {
                    console.log("FE response", response);
                    setLandingRedirect(true);
                })
                .catch((err) => {
                    alert(err);
                });
        } else {
            alert("You must be logged-in as a shelter to create a new animal profile.")
        }
    }

    if (landingRedirect) {
        return <Redirect to="/shelterlanding" />
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
                <select
                    name="species"
                    id="species"
                    onChange={e => setSpecies(e.target.value)}
                >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="critter">Critter</option>
                </select>
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
                {/* MAKE THIS A DROP DOWN: S, M, L, XL */}
                Size:
                <select
                    name="size"
                    id="size"
                    onChange={e => setSize(e.target.value)}
                >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="x-large">X-Large</option>
                </select>
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
        </form >
    );
}

export default AnimalRegistration;
