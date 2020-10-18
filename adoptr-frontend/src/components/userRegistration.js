import React, { useState } from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom"

function UserRegistration(props) {
    const [landingRedirect, setLandingRedirect] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userPhoto, setUserPhoto] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const registrationData = {
            name: name,
            email: email,
            password: password,
            user_photo: userPhoto,
            rejected_animals: []
        }

        axios
            .post("http://localhost:3001/users", registrationData)
            .then((response) => {


                return axios
                    .get(`http://localhost:3001/login/?email=${email}&password=${password}`)
                    .then((response) => {
                        if (response.data) {
                            props.login(response.data)
                            setLandingRedirect(true);
                        } else {
                            alert("wrong credentials")
                        }
                    })
                    .catch((err) => {
                        alert(err);
                    });

            })
            .catch((err) => {
                alert(err);
                console.log(err)
            });

    }

    if (landingRedirect) {
        return <Redirect to="/landing" />
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <label>
                Full Name
                <input
                    name="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
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

export default UserRegistration;
