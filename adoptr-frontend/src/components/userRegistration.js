import React, { useState } from 'react';
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
  
function UserRegistration(props) {
    const classes = useStyles();
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
        <div>
            <FontAwesomeIcon className="animation-target dog" icon={faDog}  style={{transform: [{rotateY: '90deg'}]}}/>
            <FontAwesomeIcon className="animation-target cat" icon={faCat} />
            <FontAwesomeIcon className="animation-target crow" icon={faCrow} />
            <FontAwesomeIcon className="animation-target otter" icon={faOtter} />
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img className="animals" src={animals} alt="animals"/>
                <Typography component="h1" variant="h5">
                User Registration
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
                        name="photo"
                        label="Profile Photo"
                        type="text"
                        id="password"
                        autoComplete="photo"
                        onChange={e => setUserPhoto(e.target.value)}
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
                    <Link href="/login" variant="body2" style={{"color": "black"}}>
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

export default UserRegistration;
