import React, { useState } from 'react';

function AnimalRegistration(props) {

    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");

    const handleSubmit = (event) => {
        console.log(`
            Name: ${name}
            Breed: ${breed}
            Gender: ${gender}
            Age: ${age}
    `);

        event.preventDefault();
    }

    return (

        <form onSubmit={handleSubmit}>
            <h1>Create Animal</h1>

            <label>
                Name
        <input
                    name="name"
                    type="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Breed
        <input
                    name="breed"
                    type="breed"
                    value={breed}
                    onChange={e => setBreed(e.target.value)}
                    required />
            </label>

            <br></br>
            <label>
                Gender
        <input
                    name="gender"
                    type="gender"
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Age
        <input
                    name="age"
                    type="age"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    required />
            </label>

            <button>Submit</button>
        </form>

    );
}

export default AnimalRegistration;