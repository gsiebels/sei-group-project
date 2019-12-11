![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# Find Your Local Unicorn

![home-page](https://raw.githubusercontent.com/gsiebels/sei-group-project/master/fylu-home-page.png)

This is a travel website that offers a unique service for both the traveler and the guide. Users can either register as a traveller and book tours or as a unicorn and provide never seen before tours.
This was a project assigned to me by General Assembly during a software engineering immersive course.


## Key Learning

During this project, I solidified and learned more about various technologies (list below),
I also learned about time management and priorities as we had to take desitions on what we wanted to work first to have a presentable project.
I was in charge of mostly testing where I used Mocha and Chai, error handling, building the travelers sites and building the forms of the page, I used mainly react and Spectre framework.


## Built With
 
- HTML5
- SCSS
- Spectre CSS Framework
- JavaScript
- React
- Yarn
- Axios
- Express
- NoSQL
- MongoDB
- Node
- Insomnia
- Mocha
- Chai
- Git
- GitHub

## Deployment

The website is deployed on Heroku, you can see it here: https://find-your-local-unicorn.herokuapp.com/

![city-page](https://raw.githubusercontent.com/gsiebels/sei-group-project/master/fylu-cities.png)


 ## Getting Started
 
Use the clone button to download the source code. In your terminal enter the following commands:

- To install all the packages listed in the package.json:
```$ yarn```

- Run the app on your localhost:
```$ yarn start```

## How It Works

This page has two types of users, the travellers that are the users that request the tours and the Unicorns that are the users that can offer and create tours. Each user is able to create a profile with a username, about, profile photo, as well as edit their profiles.
There are default cities where the unicorns can offer their unique tours, all displayed with beautiful images. The cities have their profile site where you can find more about each one. Cities are created by admins.

Here is a sample of the code, this is for the traveler’s login form and error handling.


``` javascript import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

class LoginTraveller extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        email: '',
        password: ''
      },
      error: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data, error: '' }) 
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/logintraveller', this.state.data)
      .then(res => {
        Auth.setToken(res.data.token)
        this.props.history.push('/cities')
      })
      .catch(() => this.setState({ error: 'Credetials Not Recognised' }))
  }

  render() {
    return (
      <>
        <h2 className="register centre marginTopBig ourGrey">Welcome back, you globetrotter!</h2>
        <form className="centre" onSubmit={this.handleSubmit}>
          <div className=" formBackground form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input 
              className={`form-input col-7 ${this.state.error ? 'is-error' : ''}`}
              name="email" 
              type="text" 
              id="email" 
              placeholder="Email" 
              onChange={this.handleChange}/>
            {/* <p className="form-input-hint">{`${this.state.error ? 'Incorrect password' : ''}`}</p> */}
              
            <label className="form-label" htmlFor="password">Password</label>
            <input 
              className={`form-input col-7 ${this.state.error ? 'is-error' : ''}`}
              name="password" 
              type="password"
              id="password" 
              placeholder="Password" 
              onChange={this.handleChange}
            />
            {this.state.error && <p className="form-input-hint is-error">{this.state.error}</p>}
            <br />
            {/* {this.state.error && <p className="form-input-hint is-error">{this.state.error}</p>} */}
            <button className="btn btn-primary" type="submit">Log in</button>
          </div>
        </form>
      </>
    )
  }
}


export default LoginTraveller 

```


## Challenges and future improvements

My biggest challenge in the creation of this site was to create the back end and the auth. Ones I went through it a couple of times I got to understand it better.
On this project, I would add a better booking system and a way for travellers to communicate with the unicorns.


## Author

Mary-Anne Triggs, Felicia Hjertman and Gerardo Siebels
