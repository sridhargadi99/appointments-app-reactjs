// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, starToggled} = props
  const {id, title, date, isActive} = appointmentDetails

  const changeStarColor = () => {
    starToggled(id)
  }
  const starImageUrl = isActive
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-container">
      <div>
        <p className="title-style">{title}</p>
        <p className="date-style">
          Date: {format(new Date(date), 'dd MMMM yyyy, EEEE')}
        </p>
      </div>
      <button
        type="button"
        className="star-button-style"
        data-testid="star"
        onClick={changeStarColor}
      >
        <img className="star-image-style" src={starImageUrl} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
