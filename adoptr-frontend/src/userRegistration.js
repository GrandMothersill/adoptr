import React, { useState } from 'react';
import axios from "axios";

function UserRegistration(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


    const handleSubmit = (event) => {
        const registrationData = {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName
        }

        axios
            .post("http://localhost:3001/users", registrationData)
            .then((response) => {
                console.log("FE response", response);
            })
            .catch((err) => {
                alert(err);
            });

        event.preventDefault();
    }

    return (

        <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>

            <label>
                First Name
        <input
                    name="firstName"
                    type="firstName"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Last Name
        <input
                    name="lastName"
                    type="lastName"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required />
            </label>

            <br></br>
            <label>
                Email:
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

            <button>Submit</button>
        </form>

    );
}

export default UserRegistration;