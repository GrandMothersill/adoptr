import React, { useState } from 'react';
import axios from "axios";

function Login(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userPhoto, setUserPhoto] = useState("");

    const handleSubmit = (event) => {

        // user submits form correctly
        // GET from database WHERE email = email AND password = password



        event.preventDefault();
        const registrationData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            user_photo: userPhoto,
            rejected_animals: []
        }

        axios
            .post("http://localhost:3001/users", registrationData)
            .then((response) => {
                props.login(registrationData)
            })
            .catch((err) => {
                alert(err);
            });

    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login Form</h1>
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

            <button>Submit</button>
        </form>
    );
}

export default Login;
