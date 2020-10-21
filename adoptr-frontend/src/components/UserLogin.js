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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UserLogin(props) {
  const classes = useStyles();
  const [landingRedirect, setLandingRedirect] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields")
    } else {
      axios
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
    }
  }

  if (landingRedirect) {
    return <Redirect to="/landing" />
  }

  return (
    <div className="login">
      <div className="animation">
        <Spring
          config={{ duration: 1000 }}
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}>
          {props => (
            <div style={props}>
              <FontAwesomeIcon className="paws one" icon={faPaw} />
            </div>
          )}
        </Spring>
        <Spring
          config={{ duration: 1000, delay: 200 }}
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}>
          {props => (
            <div style={props}>
              <FontAwesomeIcon className="paws two" icon={faPaw} />
            </div>
          )}
        </Spring>
        <Spring
          config={{ duration: 1000, delay: 400 }}
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}>
          {props => (
            <div style={props}>
              <FontAwesomeIcon className="paws three" icon={faPaw} />
            </div>
          )}
        </Spring>
        <Spring
          config={{ duration: 1000, delay: 600 }}
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}>
          {props => (
            <div style={props}>
              <FontAwesomeIcon className="paws four" icon={faPaw} />
            </div>
          )}
        </Spring>
        <Spring
          config={{ duration: 1000, delay: 800 }}
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}>
          {props => (
            <div style={props}>
              <FontAwesomeIcon className="paws five" icon={faPaw} />
            </div>
          )}
        </Spring>
        <Spring
          config={{ duration: 1000, delay: 1000 }}
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}>
          {props => (
            <div style={props}>
              <FontAwesomeIcon className="paws six" icon={faPaw} />
            </div>
          )}
        </Spring>
        <Spring
          config={{ duration: 1000, delay: 1200 }}
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}>
          {props => (
            <div style={props}>
              <FontAwesomeIcon className="paws seven" icon={faPaw} />
            </div>
          )}
        </Spring>
        <Spring
          config={{ duration: 1000, delay: 1400 }}
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}>
          {props => (
            <div style={props}>
              <FontAwesomeIcon className="paws eight" icon={faPaw} />
            </div>
          )}
        </Spring>
        <Spring
          config={{ duration: 1000, delay: 1600 }}
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}>
          {props => (
            <div style={props}>
              <FontAwesomeIcon className="paws nine" icon={faPaw} />
            </div>
          )}
        </Spring>
        <Spring
          config={{ duration: 1000, delay: 1800 }}
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}>
          {props => (
            <div style={props}>
              <FontAwesomeIcon className="paws ten" icon={faPaw} />
            </div>
          )}
        </Spring>
        <Spring
          config={{ duration: 1000, delay: 2000 }}
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}>
          {props => (
            <div style={props}>
              <FontAwesomeIcon className="paws eleven" icon={faPaw} />
            </div>
          )}
        </Spring>
        <Spring
          config={{ duration: 1000, delay: 2200 }}
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}>
          {props => (
            <div style={props}>
              <FontAwesomeIcon className="paws twelve" icon={faPaw} />
            </div>
          )}
        </Spring>
        <Spring
          config={{ duration: 1000, delay: 2400 }}
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}>
          {props => (
            <div style={props}>
              <FontAwesomeIcon className="paws thirteen" icon={faPaw} />
            </div>
          )}
        </Spring>
        <Spring
          config={{ duration: 1000, delay: 2600 }}
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}>
          {props => (
            <div style={props}>
              <FontAwesomeIcon className="paws fourteen" icon={faPaw} />
            </div>
          )}
        </Spring>
      </div>
      <Container component="main" maxWidth="xs" className="login-form">
        <CssBaseline />
        <div className={classes.paper}>
          <img className="animals" src={animals} alt="animals" />
          <Typography component="h1" variant="h5">
            User Login
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{ "backgroundColor": "black" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/users" variant="body2" style={{ color: "black" }}>
                  Don't have an account? Create one.
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
