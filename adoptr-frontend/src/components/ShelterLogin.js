import React, { useState } from 'react';
import axios from "axios";

function ShelterLogin(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        //// NEED TO ACCOUNT FOR EDGE CASES AND ERRORS AND IF THE EMAIL/PASSWORD INCORRECT

        axios
            .get(`http://localhost:3001/shelterlogin/?email=${email}&password=${password}`)
            .then((response) => {
                const data = response.data[0];
                props.shelterLogin(data)
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

export default ShelterLogin;
