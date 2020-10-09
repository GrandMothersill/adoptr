import * as React from 'react'
import './App.css';
import UserRegistration from "./userRegistration.js";
import AnimalRegistration from "./animalRegistration.js";

function App() {



  return (
    <div className="App">
      <header className="App-header">

        <p>
          Some day this will be a tinder-style app for adopting and fostering pets.
          <br></br>
          Made by Erica Sun and Graham Mothersill
        </p>

        <UserRegistration />
        <AnimalRegistration />

      </header>

    </div>
  );
}

export default App;
