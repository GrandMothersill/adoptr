import React, { useState, useEffect } from "react"
import axios from "axios"
import { Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";

function UserMatches(props) {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);


  useEffect(() => {
    axios
      .get(`http://localhost:3001/matches/user/?userID=${props.state.account._id}`)
      .then(response => {
        const matches = response.data;
        axios.all(matches.map(match =>
          axios.get(`http://localhost:3001/profile/?id=${match.animalID}`)))
          .then(axios.spread(function (...res) {
            console.log("this is the response", res)
            setProfiles(res.map(res => res.data[0]));
            console.log("before setting", loading)
            setLoading(false);
          }));
      })
      .catch((err) => {
        alert(err);
      })
  }, []);

  if (!loading) {
    if (!props.state.type) {
      return <Redirect to="/" />
    }
    console.log("after setting", loading);
    console.log("no longer loading. this is profiles", profiles);
    return (
      <div className="landing">
        <h1>User Matches {props.state.account.name} and {props.state.account._id}</h1>
        <div className="row dashboard"><Dashboard profiles={profiles} type={props.state.type}/></div>
      </div>
    )
  } else {
    return (<h1>Loading...</h1>)
  }
}

export default UserMatches;