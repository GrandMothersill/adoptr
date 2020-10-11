import React, { useState } from 'react';
import axios from "axios";

function ShelterRegistration(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [bio, setBio] = useState("");
    const [streetNumber, setStreetNumber] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const registrationData = {
            email: email,
            password: password,
            name: name,
            phone: phone,
            bio: bio,
            location: {
                latitude: 200,
                longitude: 100
            },
            address: {
                street_number: streetNumber,
                street: street,
                city: city,
                province: province,
                postal_code: postalCode
            }
        }

        console.log(registrationData);

        axios
            .post("http://localhost:3001/shelters", registrationData)
            .then((response) => {
                console.log("FE response", response);
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Shelter</h1>
            <label>
                Name of Shelter
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
                Shelter Phone Number:
                <input
                    name="phone"
                    type="phoneNumber"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
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
                Shelter Street Number:
                <input
                    name="street_number"
                    type="text"
                    value={streetNumber}
                    onChange={e => setStreetNumber(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Shelter Street:
                <input
                    name="street"
                    type="text"
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Shelter City:
                <input
                    name="city"
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Shelter Province:
                <input
                    name="province"
                    type="text"
                    value={province}
                    onChange={e => setProvince(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Shelter Postcal Code:
                <input
                    name="address"
                    type="text"
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                    required />
            </label>
            <br></br>
            <button>Submit</button>
        </form>
    );
}

export default ShelterRegistration;