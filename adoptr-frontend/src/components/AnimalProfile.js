import Axios from "axios";
import React, { useState, useEffect }  from "react";
import axios from "axios";

function AnimalProfile() {
  useEffect(() => {
    axios.get("http://localhost:3001/animals")
    .then((response) => {
      const data = response.data;
      console.log("animal profiles", data)
    })
    .catch((err) => {
        alert(err);
    });
  }, []);

  return (
    <div>
      <h1>Results</h1>
    </div>
  )
}

export default AnimalProfile;