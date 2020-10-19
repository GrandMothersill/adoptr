import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom"
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faCat, faCrow, faOtter } from '@fortawesome/free-solid-svg-icons';
import animals from "../images/animals.png";
import "../styles/Login.css"

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
    };

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

        ////////// ADD ERRROR HANDLING FOR IF COORDINATES CANNOT BE FOUND
        axios
            .post("http://localhost:3001/shelters", registrationData)
            .then((response) => {
                return axios
                    .get(`http://localhost:3001/shelterlogin/?email=${email}&password=${password}`)
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
        <div>
            <FontAwesomeIcon className="dog" icon={faDog} />
            <FontAwesomeIcon className="cat" icon={faCat} />
            <FontAwesomeIcon className="crow" icon={faCrow} />
            <FontAwesomeIcon className="otter" icon={faOtter} />
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img className="animals" src={animals} alt="animals"/>
                <Typography component="h1" variant="h5">
                Shelter Registration
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
                    />
                    </Grid>
                    <Grid item xs={12}>
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
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    style={{"background-color": "black"}}
                >
                    Sign Up
                </Button>
                <Grid container>
                    <Grid item>
                    <Link href="/shelterlogin" variant="body2" style={{"color": "black"}}>
                        Already have an account? Login
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            </Container>
        </div>
    );
}

export default ShelterRegistration;