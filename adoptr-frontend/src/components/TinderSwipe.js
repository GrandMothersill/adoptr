import React, { useState } from "react"
import './TinderSwipe.css';
import TinderCard from 'react-tinder-card'



const db = [
    {
        name: 'Richard Hendricks',
    },
    {
        name: 'Erlich Bachman',
    },
    {
        name: 'Monica Hall',
    },
    {
        name: 'Jared Dunn',
    },
    {
        name: 'Dinesh Chugtai',
    }
]

function TinderSwipe(props) {

    const characters = db
    const [lastDirection, setLastDirection] = useState()

    // const onSwipe = (direction) => {
    //     console.log('You swiped: ' + direction)
    // }

    // const onCardLeftScreen = (myIdentifier) => {
    //     console.log(myIdentifier + ' left the screen')
    // }

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    return (
        <div className='cardContainer'>
            {characters.map((character) =>
                <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
                    <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                        <h3>{character.name}</h3>
                    </div>
                </TinderCard>
            )}

            {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
        </div>
    )
};

export default TinderSwipe;