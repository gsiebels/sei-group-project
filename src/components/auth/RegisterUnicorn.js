import React from 'react'
import axios from 'axios'
import makeAnimated from 'react-select/animated'
import CreatableSelect from 'react-select/creatable'

const animatedComponents = makeAnimated()

class RegisterUnicorn extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        name: '',
        profilePicture: '',
        about: '',
        city: '',
        language: [''],
        age: '',
        gender: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      },
      errors: {},
      cities: []
    }

    this.options = [
      { value: 'English', label: 'English' },
      { value: 'French', label: 'French' },
      { value: 'Japanese', label: 'Japanese' },
      { value: 'Greek', label: 'Greek' },
      { value: 'Italian', label: 'Italian' },
      { value: 'Portuguese', label: 'Portuguese' },
      { value: 'Spanish', label: 'Spanish' },
      { value: 'Maya', label: 'Maya' },
      { value: 'Swedish', label: 'Swedish' },
      { value: 'Tamil', label: 'Tamil' },
      { value: 'Mandarin', label: 'Mandarin' },
      { value: 'Arabic', label: 'Arabic' },
      { value: 'Russian', label: 'Russian' },
      { value: 'German', label: 'German' },
      { value: 'Dutch', label: 'Dutch' },
      { value: 'Urdu', label: 'Urdu' },
      { value: 'Farci', label: 'Farci' },
      { value: 'Aymara', label: 'Aymara' }
    ]

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCreatableSelect = this.handleCreatableSelect.bind(this)
  }

  componentDidMount() {
    axios.get('/api/cities')
      .then(res => this.setState({ cities: res.data }))
  }

  handleChange({ target: { name, value, type, checked } }) {
    const newValue = type === 'checkbox' ? checked : value
    const data = { ...this.state.data, [name]: newValue }
    const errors = { ...this.state.errors, [name]: '' }
    this.setState({ data, errors })
  }

  handleCreatableSelect(selected) {
    const language = selected ? selected.map(item => item.value) : []
    const data = { ...this.state.data, language }
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/registerunicorn', this.state.data)
      .then(() => this.props.history.push('/loginunicorn'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    const { data, cities } = this.state
    return (

      <section>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <h2>Register</h2>
            <div className="field">
              <label className="label">Full name</label>
              <div className="control">
                <input 
                  // className="input"
                  className={`form-input col-5 ${this.state.errors.name ? 'is-error' : ''}`}
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={data.name}
                  onChange={this.handleChange}
                />
                <p className="form-input-hint">{`${this.state.errors.name ? 'A name is required' : ''}`}</p>

              </div>
            </div>

            <div className="field">
              <label className="label">Profile picture (url)</label>
              <div className="control">
                <input 
                  // className="input"
                  className={`form-input col-5 ${this.state.errors.profilePicture ? 'is-error' : ''}`}
                  name="profilePicture"
                  placeholder="My profile picture"
                  value={data.profilePicture}
                  onChange={this.handleChange}
                />
                <p className="form-input-hint">{`${this.state.errors.profilePicture ? 'An image URL is required' : ''}`}</p>

              </div>
            </div>

            <div className="field">
              <label className="label">About me</label>
              <div className="control">
                <textarea 
                  // className="textarea"
                  className={`form-input col-5 ${this.state.errors.about ? 'is-error' : ''}`}
                  name="about"
                  placeholder="About me"
                  value={data.about}
                  onChange={this.handleChange}
                />
                <p className="form-input-hint">{`${this.state.errors.about ? 'This area is required' : ''}`}</p>

              </div>
            </div>

            <div className="field">
              <label className="label">City</label>
              <div className="select">
                <select 
                  className={`form-select col-5 ${this.state.errors.city ? 'is-error' : ''}`}
                  name="city" 
                  onChange={this.handleChange} 
                  value={data.city}>
                  <option value="" disabled>Select your city</option>
                  {cities.map(city => <option key={city._id} value={city._id}>{city.name}</option>)}
                </select>
                <p className="form-input-hint">{`${this.state.errors.about ? 'Select a city.' : ''}`}</p>
              </div>
            </div>

            <div className="field">
              <label className="label">My languages (select from dropdown or add new)</label>
              <div className="control">
                <CreatableSelect
                  className="col-5"
                  options={this.options}
                  isMulti
                  onChange={this.handleCreatableSelect}
                  components={animatedComponents}
                  errors={this.state.errors}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Age</label>
              <div className="control">
                <input
                  className={`form-input col-5 ${this.state.errors.age ? 'is-error' : ''}`}
                  name="age"
                  number="number"
                  placeholder="My age"
                  value={data.age}
                  onChange={this.handleChange}
                />
                <p className="form-input-hint">{`${this.state.errors.age ? 'Please, enter a number.' : ''}`}</p>

              </div>
            </div>

            <div className="field">
              <label className="label">Gender</label>
              <div className="select">
                <select name="gender"
                  onChange={this.handleChange} 
                  value={data.gender}
                  className={`form-select col-5${this.state.errors.gender ? 'is-error' : ''}`}>
                  <option value="" disabled>Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className={`form-input col-5 ${this.state.errors.email ? 'is-error' : ''}`}
                  name="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={this.handleChange}
                />
                <p className="form-input-hint">{`${this.state.errors.email ? 'An email is required.' : ''}`}</p>

              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  // className="input"
                  className={`form-input col-5 ${this.state.errors.password ? 'is-error' : ''}`}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={this.handleChange}
                />
                <p className="form-input-hint">{`${this.state.errors.password ? 'A password is required.' : ''}`}</p>

              </div>
            </div> 

            <div className="field">
              <label className="label">Password confirmation</label>
              <div className="control">
                <input
                  // className="input"
                  className={`form-input col-5 ${this.state.errors.passwordConfirmation ? 'is-error' : ''}`}
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Password confirmation"
                  value={data.passwordConfirmation}
                  onChange={this.handleChange}
                />
                <p className="form-input-hint">{`${this.state.errors.passwordConfirmation ? 'Oops, the passwords do not match' : ''}`}</p>

              </div>
            </div>   
            <br/>

            <button className="btn btn-success">Register</button>
          </div>
        </form>
      </section>
    )
  }

}

export default RegisterUnicorn