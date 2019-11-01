import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { IoMdWalk, IoMdTime, IoMdCalendar, IoMdCash, IoIosStar } from 'react-icons/io'
import { Link } from 'react-router-dom'

class ExpShow extends React.Component {
  constructor() {
    super()

    this.state = {
      experience: null,
      text: '',
      score: '',
      errors: {}

    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.deleteReview = this.deleteReview.bind(this)
    this.handleScoreChange = this.handleScoreChange.bind(this)
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    const experienceId = this.props.match.params.id
    axios.get(`/api/experiences/${experienceId}`)
      .then(res => this.setState({ experience: res.data }))
      .catch(err => console.log(err))
  }

  handleChange(e) {
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ text: e.target.value, errors })
  }

  handleScoreChange(e) {
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ score: e.target.value, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    const experienceId = this.props.match.params.id
    axios.post(`/api/experiences/${experienceId}/reviews`, { text: this.state.text, score: this.state.score }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        this.setState({ experience: res.data, text: '', score: '' })
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  deleteReview(e) {
    e.preventDefault()

    const experienceId = this.props.match.params.id
    axios.delete(`/api/experiences/${experienceId}/reviews/${e.target.value}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.getData())
      .catch(err => console.log(err))
  }

  handleDelete() {
    const expId = this.props.match.params.id
    axios.delete(`/api/experiences/${expId}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => {
        this.props.history.push('/experiences')
      })
      .catch(err => console.log(err))
  }

  isOwnerExperience() {
    return Auth.getPayload().sub === this.state.experience.unicorn._id
  }

  isOwnerReview(id) {
    console.log(Auth.getPayload().sub, id)
    return Auth.getPayload().sub === id
  }

  render() {
    if (!this.state.experience) return null
    const { experience } = this.state
    const expId = experience._id
    return (
      <>
        <div className="columns">
          <img className="column columnCoverImage col-12" src={experience.image} alt={experience.name}/>
          <div className="column columnTall col-6">
            <h2 className="showTitle">{experience.name}</h2>
            <br />
            <p className="expDes">{experience.description}</p>
            <br />
            <br />
            {this.isOwnerExperience() &&
        <>
          <div className="spaceLeft">
            <Link to={`/experiences/${expId}/edit`}>
              <button className="btn btn-primary">EDIT THIS EXPERIENCE</button>
            </Link>
            <span> </span>
            <button onClick={this.handleDelete} className="btn btn-error">DELETE THIS EXPERIENCE</button>
          </div>
        </>
            }
          </div>
          <div className="column columnTall col-6">
            <br />
            <br />
            <br />
            <br />
            <br />
            <h4 className="spaceLeftMassive marginTop borderLeft"><span className="text-success">CATEGORY:  </span>{`${experience.category}`}</h4>
            <h4 className="spaceLeftMassive textSize borderLeft"><span className="icon"><IoMdWalk/></span><span> </span>{experience.intensity}</h4>
            <h4 className="spaceLeftMassive borderLeft"><span className="icon"><IoMdCash/></span><span> </span>£{experience.price}</h4>
            <h4 className="spaceLeftMassive borderLeft"><span className="icon"><IoMdCalendar/></span><span> </span>{`${experience.availability}`}</h4>
            <h4 className="spaceLeftMassive borderLeft"><span className="icon"><IoMdTime/></span><span> </span>{`${experience.time}`}</h4>
            <br />
            <Link to={{ pathname: '/book', state: { experience } }}>
              <div className="spaceLeftMassive">
                <button className="btn btn-lg btn-success">Book this experience!</button>
              </div>
            </Link>
            <br />
            <br />
            <div className="spaceLeftMassive">
              <button className="btn btn-lg" onClick={() => this.props.history.goBack()}>
              Back to the unicorn
              </button>
            </div>
          </div>
        </div>
        <br />
        <h3 className="reviewTitle text-primary">REVIEWS</h3>
        <br />
        <div className="columns spaceLeftBig textLarge">
          {this.state.experience.reviews.map(review =>
            <div className="reviewArea" key={review._id}>
              <p className="textLarge">{`${review.text}`}</p>
              <br />
              <br />
              <h6 className="textLarge text-success pushToRight">Score:</h6>
              <p className="pushToRight">{`${review.score}`}<IoIosStar/></p>
              <h6 className="textLarge text-primary pushToRight">Traveller:</h6>
              <p className="pushToRight">{review.traveller.name}</p>
              <br />
              {console.log(review)}
              {this.isOwnerReview(review.traveller._id) &&
                <button onClick={this.deleteReview} value={review._id} className="btn btn-error">DELETE THIS REVIEW</button>
              }
            </div>
          )}
          <br />
          <div className="spaceSmall">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <textarea 
                  className="form-input" 
                  name="text"
                  id="text" 
                  placeholder="Write your review here" 
                  rows="3"
                  value={this.state.text}
                  onChange={this.handleChange}/>
                <br />
                <div className="field">
                  <label>Score (1-5)</label>
                  <div className="control">
                    <input
                      className="input"
                      // className={`input ${this.state.errors ? 'is-error' : ''}`}
                      name="age"
                      number="number"
                      value={this.state.score}
                      onChange={this.handleScoreChange}
                    />
                  </div>
                </div>
                <br />
                <input className="btn btn-success" type="submit" value="POST REVIEW" />
                <br />
                <br />
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default ExpShow