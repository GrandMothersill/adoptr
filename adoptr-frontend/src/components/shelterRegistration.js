import React, { useState, useEffect } from 'react';
import axios from "axios";

function ShelterRegistration(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [phone, setPhone] = useState("");
    const [streetNumber, setStreetNumber] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const [coordinates, setCoordinates] = useState({ longitude: null, latitude: null });


    function coordError(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    var coordOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(e => {
            console.log(e.coords.longitude, e.coords.latitude)
            setCoordinates({
                longitude: e.coords.longitude,
                latitude: e.coords.latitude
            });
        }, coordError, coordOptions);
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();

        const registrationData = {
            name: name,
            email: email,
            password: password,
            bio: bio,
            phone: phone,
            address: {
                street_number: streetNumber,
                street: street,
                city: city,
                province: province,
                postal_code: postalCode
            },
            location: coordinates
        }

        console.log(registrationData);


        ////////// ADD ERRROR HANDLING FOR IF COORDINATES CANNOT BE FOUND


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
                Phone Number:
                <input
                    name="phone"
                    type="phoneNumber"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Street Number:
                <input
                    name="street_number"
                    type="text"
                    value={streetNumber}
                    onChange={e => setStreetNumber(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Street:
                <input
                    name="street"
                    type="text"
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                City:
                <input
                    name="city"
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Province:
                <input
                    name="province"
                    type="text"
                    value={province}
                    onChange={e => setProvince(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Postcal Code:
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