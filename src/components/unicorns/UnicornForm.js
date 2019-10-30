import React from 'react'


const UnicornForm = ({ cities, data, handleChange, handleSubmit }) => (
  <section>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <h2>Update my profile</h2>
        <div className="field">
          <label className="label">Full name</label>
          <div className="control">
            <input 
              className="input"
              name="name"
              placeholder="Full name"
              value={data.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Profile picture (url)</label>
          <div className="control">
            <input 
              className="input"
              name="profilePicture"
              placeholder="My profile picture"
              value={data.profilePicture}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">About me</label>
          <div className="control">
            <textarea 
              className="textarea"
              name="about"
              placeholder="About me"
              value={data.about}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">City</label>
          <div className="select">
            <select name="city" onChange={handleChange} value={data.city}>
              <option value="" disabled>Select your city</option>
              {cities.map(city => <option key={city._id} value={city._id}>{city.name}</option>)}
            </select>
          </div>
        </div>
        <div className="field">
          <label className="label">Languages spoken</label>
          <div className="control">
            <input 
              className="input"
              name="language"
              placeholder="I speak the following languages..."
              value={data.language}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Age</label>
          <div className="control">
            <input
              className="input"
              name="age"
              number="number"
              placeholder="My age"
              value={data.age}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Gender</label>
          <div className="select">
            <select name="gender" onChange={handleChange} value={data.gender}>
              <option value="" disabled>Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
            </select>
          </div>
        </div>   
        <br/>
        <button className="btn btn-success">UPDATE MY PROFILE</button>
      </div>
    </form>
  </section>
)

export default UnicornForm
