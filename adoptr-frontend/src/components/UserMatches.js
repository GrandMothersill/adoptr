import React, { useState, useEffect } from "react"
import axios from "axios"
import Dashboard from "./Dashboard";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function UserMatches(props) {
  const [loading, setLoading] = useState(true);
  let profiles = []

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`http://localhost:3001/matches/user/?userID=${props.state.account._id}`)
      const matches = request.data;
      await matches.forEach(async function(match) {
        const secondRequest = await axios.get(`http://localhost:3001/profile/?id=${match.animalID}`)
        const profile = secondRequest.data[0]
        profiles.push(profile)
      })

      setLoading(false);
      // const profiles = await matches.map(async function fetchProfile(match) {
      //   await axios.get(`http://localhost:3001/profile/?id=${match.animalID}`)
      // })
      // console.log(profiles)
    }

    fetchData();
    /*
    axios
    .get(`http://localhost:3001/matches/user/?userID=${props.state.account._id}`) 
    .then(response => {
      const matches = response.data;
      matches.map(match => 
        axios.get(`http://localhost:3001/profile/?id=${match.animalID}`)
        .then(response => {
          profiles.push(response.data[0]);
          console.log(profiles);
          // profileCards.push(
            <Card style={{ width: '18rem' }} key={profile._id}>
              <Card.Img variant="top" src={profile.animal_photos[0]} />
              <Card.Body>
                <Card.Title>{profile.name}</Card.Title>
                <Card.Text>
                  {profile.bio}
                </Card.Text>
                <Button variant="primary">See {profile.name}'s matches</Button>
              </Card.Body>
            </Card>
          // )
        })
        .catch(err => {
          alert(err);
      }))
      setLoading(false)
    })
    .catch((err) => {
      alert(err);
    })
    */
  }, []);

  if (!loading) {
    return (
      <div className="landing">
        <h1>User Matches {props.state.account.name} and {props.state.account._id}</h1>
        <div className="row dashboard"><Dashboard profiles={profiles} /></div>
      </div>
    )
  } else {
    return (<h1>Loading...</h1>)
  }
}

export default UserMatches;