// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    date: '',
    buttonActive: false,
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state

    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isActive: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  addTitle = event => {
    this.setState({title: event.target.value})
  }

  addDate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  starToggled = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isActive: !eachAppointment.isActive}
        }
        return eachAppointment
      }),
    }))
  }

  clickStarredButton = () => {
    const {buttonActive} = this.state
    this.setState({buttonActive: !buttonActive})
  }

  getFinalAppointmentDetails = () => {
    const {buttonActive, appointmentList} = this.state
    if (buttonActive) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isActive === true,
      )
    }
    return appointmentList
  }

  render() {
    const {title, date, buttonActive} = this.state
    const buttonStyle = buttonActive
      ? 'starred-button-style2'
      : 'starred-button-style1'
    const finalAppointmentDetails = this.getFinalAppointmentDetails()
    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="heading-style1">Add Appointment</h1>
          <div className="form-image-container">
            <form className="form-container" onSubmit={this.addAppointment}>
              <label className="label-style" htmlFor="textId">
                Title
              </label>
              <input
                className="input-style"
                type="text"
                placeholder="Title"
                value={title}
                id="textId"
                onChange={this.addTitle}
              />
              <label className="label-style" htmlFor="dateId">
                Date
              </label>
              <input
                className="input-style"
                type="date"
                placeholder="dd/mm/yyyy"
                value={date}
                id="dateId"
                onChange={this.addDate}
              />
              <button type="submit" className="button-style">
                Add
              </button>
            </form>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image-style"
              />
            </div>
          </div>
          <div>
            <hr className="hr-style" />
          </div>
          <div className="appointments-container">
            <h1 className="heading-style1">Appointments</h1>
            <div className="button-container">
              <button
                className={`starred-button-style ${buttonStyle}`}
                type="button"
                onClick={this.clickStarredButton}
              >
                starred
              </button>
            </div>
          </div>
          <ul className="appointment-list-container">
            {finalAppointmentDetails.map(eachAppointment => (
              <AppointmentItem
                appointmentDetails={eachAppointment}
                key={eachAppointment.id}
                starToggled={this.starToggled}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
