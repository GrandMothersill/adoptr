import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom"
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import animals from "../images/animals.png";
import "../styles/Login.css";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function ShelterRegistration(props) {
    const classes = useStyles();
    const [landingRedirect, setLandingRedirect] = useState(false);
    const [name, setName] = useState(props.state.account.name);
    const [email, setEmail] = useState(props.state.account.email);
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState(props.state.account.bio);
    const [phone, setPhone] = useState(props.state.account.phone);
    const [streetNumber, setStreetNumber] = useState(props.state.account.address.street_number);
    const [street, setStreet] = useState(props.state.account.address.street);
    const [city, setCity] = useState(props.state.account.address.city);
    const [province, setProvince] = useState(props.state.account.address.province);
    const [postalCode, setPostalCode] = useState(props.state.account.address.postal_code);

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
            shelterID: props.state.account._id,
            name: name,
            email: email,
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

        ////////// ADD ERRROR HANDLING FOR IF COORDINATES CANNOT BE FOUND
        axios
            .put("http://localhost:3001/shelter", registrationData)
            .then((response) => {
                console.log(response);
                return axios
                    .get(`http://localhost:3001/shelterlogin/?email=${registrationData.email}&password=${password}`)
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
            });
    }

    if (landingRedirect) {
        return <Redirect to="/shelterlanding" />
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img className="animals" src={animals} alt="animals" />
                <Typography component="h1" variant="h5">
                    Edit Shelter Information
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                name="name"
                                autoComplete="name"
                                onChange={e => setName(e.target.value)}
                                autoFocus
                                value={name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="email"
                                label="Email Address"
                                type="text"
                                id="email"
                                autoComplete="email"
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="bio"
                                label="Bio"
                                type="text"
                                id="bio"
                                autoComplete="bio"
                                onChange={e => setBio(e.target.value)}
                                value={bio}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="phone"
                                label="Phone Number"
                                type="tel"
                                id="phone"
                                autoComplete="phone"
                                onChange={e => setPhone(e.target.value)}
                                value={phone}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="number"
                                label="Street Number"
                                type="text"
                                id="number"
                                autoComplete="number"
                                onChange={e => setStreetNumber(e.target.value)}
                                value={streetNumber}
                            />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="street"
                                label="Street"
                                type="text"
                                id="street"
                                autoComplete="street"
                                onChange={e => setStreet(e.target.value)}
                                value={street}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="city"
                                label="City"
                                type="text"
                                id="city"
                                autoComplete="city"
                                onChange={e => setCity(e.target.value)}
                                value={city}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="province"
                                label="Province"
                                type="text"
                                id="province"
                                autoComplete="province"
                                onChange={e => setProvince(e.target.value)}
                                value={province}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="code"
                                label="Postal Code"
                                type="text"
                                id="code"
                                autoComplete="code"
                                onChange={e => setPostalCode(e.target.value)}
                                value={postalCode}
                            />
                        </Grid>
                        <p style={{"margin-top": "20px", "padding-left": "15px"}}>Please input your password to confirm edits</p>
                        <Grid item xs={12} style={{"padding-top": 0}}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        style={{ "background-color": "black" }}
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default ShelterRegistration;