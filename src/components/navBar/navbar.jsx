import { Link } from 'react-router-dom'
import './style.css'
import logo from './../../utils/img.jpeg'

const Navbar = () => {
  return (
    <div className="navBarPos">
      <div className="navBar">
        <Link to="/">
          <img className="logo" src={logo} />
        </Link>

        <Link to="/answer">Answer</Link>

        <Link to="/lecturer">Lecturer</Link>

        <Link to="/poll">Poll</Link>

        <Link to="/questions">Question</Link>

        <Link to="/subject">Subject</Link>
      </div>
    </div>
  )
}
export default Navbar
