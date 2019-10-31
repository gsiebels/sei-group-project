import React from 'react'
import { Link } from 'react-router-dom'

const UnicornCard = ({ name, profilePicture, language, experiences, _id }) => (
  <div className="card">
    <div className="card-image centre">
      <img className="city-card img-responsive" src={profilePicture} alt={name}/>
    </div>
    <div className="card-header">
      <div className="card-title text-uppercase h4">{name}</div>
      <div className="card-subtitle text-primary">Language(s) spoken: {`${language}`}</div>
    </div>
    <div className="card-body">
      <u>My awesome experiences:</u>
      <div className="expname">
        {experiences.map(exp => (
          <li className="expName" key={exp.name}>{`※ ${exp.name}`}</li>
        ))}
      </div>
      <br />
      <br />
      <div className="centre">
        <Link to={`/unicorns/${_id}`}>
          <button className="btn">Check me out...</button>
        </Link>
      </div>
    </div>
  </div>
)

export default UnicornCard

