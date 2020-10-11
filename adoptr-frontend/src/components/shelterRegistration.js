import React, { useState } from 'react';
import axios from "axios";

function ShelterRegistration(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userPhoto, setUserPhoto] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const registrationData = {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            user_photo: userPhoto,
            rejected_animals: []
        }

        axios
            .post("http://localhost:3001/users", registrationData)
            .then((response) => {
                console.log("FE response", response);
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <label>
                First Name
                <input
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Last Name
                <input
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Email
                <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Password:
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Display Picture:
                <input
                    name="userPhoto"
                    type="userPhoto"
                    value={userPhoto}
                    onChange={e => setUserPhoto(e.target.value)}
                    required />
            </label>
            <br></br>
            <button>Submit</button>
        </form>
    );
}

export default ShelterRegistration;