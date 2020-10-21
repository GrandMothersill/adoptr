import React, { useState } from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Spring } from "react-spring/renderprops";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import animals from "../images/animals.png";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function AnimalRegistration(props) {
    const classes = useStyles();
    const [landingRedirect, setLandingRedirect] = useState(false);
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("Dog");
    const [sex, setSex] = useState("Male");
    const [age, setAge] = useState("");
    const [animalPhoto, setAnimalPhoto] = useState("");
    const [bio, setBio] = useState("");
    const [breed, setBreed] = useState("");
    const [colour, setColour] = useState("");
    const [size, setSize] = useState("Small");
    const [spayedNeudered, setSpayedNeudered] = useState(false);
    const [foster, setFoster] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (props.state.type === 'shelter') {

            const registrationData = {
                name: name,
                species: species,
                sex: sex,
                age: age,
                animal_photos: [animalPhoto],
                bio: bio,
                foster: foster,
                breedAndInfo: {
                    breed: breed,
                    colour: colour,
                    size: size,
                    spayedNeudered: spayedNeudered
                },
                shelterInfo: {
                    shelter_name: props.state.account.name,
                    shelter_id: props.state.account._id
                },
                coordinates: props.state.account.location
            }

            axios
                .post("http://localhost:3001/animals", registrationData)
                .then((response) => {
                    console.log("FE response", response);
                    setLandingRedirect(true);
                })
                .catch((err) => {
                    alert(err);
                });
        } else {
            alert("You must be logged-in as a shelter to create a new animal profile.")
        }
    }

    if (landingRedirect) {
        return <Redirect to="/shelterlanding" />
    }

    return (
        <Container component="main" maxWidth="xs" className="login-form">
            <CssBaseline />
            <div className={classes.paper}>
            <img className="animals" src={animals} alt="animals" />
            <Typography component="h1" variant="h5">
                Create New Animal Profile
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    onChange={e => setName(e.target.value)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Species</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        onChange={e => setSpecies(e.target.value)}
                        >
                        <MenuItem value="Dog">Dog</MenuItem>
                        <MenuItem value="Cat">Cat</MenuItem>
                        <MenuItem value="Critter">Critter</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Sex</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        onChange={e => setSex(e.target.value)}
                        >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="age"
                    label="Age"
                    name="age"
                    autoComplete="age"
                    autoFocus
                    onChange={e => setAge(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="photo"
                    label="Photo"
                    name="photo"
                    autoComplete="photo"
                    autoFocus
                    onChange={e => setAnimalPhoto(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="bio"
                    label="Bio"
                    name="bio"
                    autoComplete="bio"
                    autoFocus
                    onChange={e => setBio(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="breed"
                    label="Breed"
                    name="breed"
                    autoComplete="breed"
                    autoFocus
                    onChange={e => setBreed(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="colour"
                    label="Colour"
                    name="colour"
                    autoComplete="colour"
                    autoFocus
                    onChange={e => setColour(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Size</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        onChange={e => setSize(e.target.value)}
                        >
                        <MenuItem value="Small">Small</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Large">Large</MenuItem>
                        <MenuItem value="X-Large">X-Large</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                
                <label>
                    Spayed/Neudered?
                    <input
                        name="spayedNeudered"
                        type="checkbox"
                        checked={spayedNeudered}
                        onChange={() => setSpayedNeudered(!spayedNeudered)}
                    />
                </label>
                
                <Grid item xs={12} sm={3}>
                <label>
                    Fostering?
                    <input
                        name="foster"
                        type="checkbox"
                        checked={foster}
                        onChange={() => setFoster(!foster)}
                    />
                </label>
                </Grid>
                
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{ "backgroundColor": "black" }}
                >
                Submit
                </Button>
                </Grid>
            </form>
            </div>
        </Container>
            // <form onSubmit={handleSubmit}>
            //     <h1>Create Animal</h1>

            //     <label>
            //         Name
            //         <input
            //             name="name"
            //             type="text"
            //             value={name}
            //             onChange={e => setName(e.target.value)}
            //             required />
            //     </label>
            //     <br></br>
            //     <label>
            //         Species
            //         <select
            //             name="species"
            //             id="species"
            //             onChange={e => setSpecies(e.target.value)}
            //         >
            //             <option value="Dog">Dog</option>
            //             <option value="Cat">Cat</option>
            //             <option value="Critter">Critter</option>
            //         </select>
            //     </label>
            //     <br></br>
            //     <label>
            //         Sex
            //             <select
            //             name="sex"
            //             id="sex"
            //             onChange={e => setSex(e.target.value)}
            //         >
            //             <option value="Male">Male</option>
            //             <option value="Female">Female</option>
            //             <option value="Other">Other</option>
            //         </select>
            //     </label>
            //     <br></br>
            //     <label>
            //         Age
            //         <input
            //             name="age"
            //             type="text"
            //             value={age}
            //             onChange={e => setAge(e.target.value)}
            //             required />
            //     </label>
            //     <br></br>
            //     <label>
            //         Animal Photo:
            //         <input
            //             name="animalPhoto"
            //             type="text"
            //             value={animalPhoto}
            //             onChange={e => setAnimalPhoto(e.target.value)}
            //             required />
            //     </label>
            //     <br></br>
            //     <label>
            //         Bio:
            //         <input
            //             name="bio"
            //             type="text"
            //             value={bio}
            //             onChange={e => setBio(e.target.value)}
            //             required />
            //     </label>
            //     <br></br>
            //     <label>
            //         Breed:
            //         <input
            //             name="breed"
            //             type="text"
            //             value={breed}
            //             onChange={e => setBreed(e.target.value)}
            //             required />
            //     </label>
            //     <br></br>
            //     <label>
            //         Colour:
            //         <input
            //             name="colour"
            //             type="text"
            //             value={colour}
            //             onChange={e => setColour(e.target.value)}
            //             required />
            //     </label>
            //     <br></br>
            //     <label>
            //         {/* MAKE THIS A DROP DOWN: S, M, L, XL */}
            //         Size:
            //         <select
            //             name="size"
            //             id="size"
            //             onChange={e => setSize(e.target.value)}
            //         >
            //             <option value="Small">Small</option>
            //             <option value="Medium">Medium</option>
            //             <option value="Large">Large</option>
            //             <option value="X-Large">X-Large</option>
            //         </select>
            //     </label>
            //     <br></br>
                // <label>
                //     Spayed/Neudered?
                //     <input
                //         name="spayedNeudered"
                //         type="checkbox"
                //         checked={spayedNeudered}
                //         onChange={() => setSpayedNeudered(!spayedNeudered)}
                //     />
                // </label>
                // <br></br>
                // <label>
                //     Fostering?
                //     <input
                //         name="foster"
                //         type="checkbox"
                //         checked={foster}
                //         onChange={() => setFoster(!foster)}
                //     />
                // </label>
            //     <br></br>
            //     <button>Submit</button>
            // </form >
    );
}

export default AnimalRegistration;
