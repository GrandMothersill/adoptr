import React from 'react';
import { Redirect } from "react-router-dom"
import "../styles/About.css";
import arrow from "../images/curved-arrow.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faBullseye, faHeart } from '@fortawesome/free-solid-svg-icons'

function Landing(props) {

  if (props.state.type === "shelter") {
    return <Redirect to="/shelterlanding" />
  } else if (props.state.type === "user") {
    return <Redirect to="/landing" />
  } else {
    return (
      <div className="intro">
        <div className="headline">
          <div>
            <p>Making "Adopt Don't Shop" Easy</p>
            <p className="sub-headline">Start viewing animals in you area! </p>
          </div>
          <img className="arrow" src={arrow} alt="arrow"/>
          
          {/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
        </div>

        <div className="features">
          <div class="feature">
          <FontAwesomeIcon className="fa" icon={faCheckCircle} />
            <h3 class="feature-description">Easy to use.</h3>
            <p class="feature-details">So easy to use, even your new fur buddy could do it.</p>
          </div>
          <div class="feature">
            <FontAwesomeIcon className="fa" icon={faBullseye} />
            <h3 class="feature-description">Elite Clientele.</h3>
            <p class="feature-details">We have all the animals, the greatest animals.</p>
          </div>
          <div class="feature">
            <FontAwesomeIcon className="fa" icon={faHeart} />
            <h3 class="feature-description">Guaranteed to work.</h3>
            <p class="feature-details">Find your companion for life or your money back.</p>
          </div>
        </div>
        
      </div>
    )
  }
}

export default Landing;