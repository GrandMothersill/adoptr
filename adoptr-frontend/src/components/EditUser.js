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

function EditUser(props) {
    const classes = useStyles();
    const [landingRedirect, setLandingRedirect] = useState(false);
    const [name, setName] = useState(props.state.account.name);
    const [email, setEmail] = useState(props.state.account.email);
    const [password, setPassword] = useState('');
    const [userPhoto, setUserPhoto] = useState(props.state.account.user_photo);

    const handleSubmit = (event) => {
        event.preventDefault();
        const registrationData = {
            userID: props.state.account._id,
            name: name,
            email: email,
            user_photo: userPhoto,
            rejected_animals: props.state.rejected_animals
        }

        axios
            .put("http://localhost:3001/user", registrationData)
            .then((response) => {
                console.log(response);
                return axios
                    .get(`http://localhost:3001/login/?email=${registrationData.email}&password=${password}`)
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
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <img className="animals" src={animals} alt="animals" />
            <Typography component="h1" variant="h5">
                Edit User Information
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
                            name="photo"
                            label="Display Picture"
                            type="text"
                            id="photo"
                            autoComplete="photo"
                            onChange={e => setUserPhoto(e.target.value)}
                            value={userPhoto}
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
                    
        // <form onSubmit={handleSubmit}>
        //     <h1>Edit Account</h1>
        //     <label>
        //         Full Name
        //         <input
        //             name="name"
        //             type="text"
        //             value={name}
        //             onChange={e => setName(e.target.value)}
        //             required />
        //     </label>
        //     <br></br>
        //     <label>
        //         Email
        //         <input
        //             name="email"
        //             type="email"
        //             value={email}
        //             onChange={e => setEmail(e.target.value)}
        //             required />
        //     </label>
        //     <br></br>
        //     <label>
        //         Display Picture:
        //         <input
        //             name="userPhoto"
        //             type="userPhoto"
        //             value={userPhoto}
        //             onChange={e => setUserPhoto(e.target.value)}
        //             required />
        //     </label>
        //     <br></br>
        //     <p>Please input your password to confirm edits</p>
        //     <label>
        //         Password:
        //         <input
        //             name="password"
        //             type="password"
        //             value={password}
        //             onChange={e => setPassword(e.target.value)}
        //             required />
        //     </label>
        //     <br></br>

        //     <button>Submit</button>
        // </form>
    );
}

export default EditUser;
