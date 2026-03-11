import { Link } from 'react-router-dom';
import './NavBar.css'; 

export default function NavBar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <Link to="/">NP Passport</Link>
      </div>
      
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/">Map</Link>
        </li>
        <li className="nav-item">
          <Link to="/passport">My Passport</Link>
        </li>
        <li className="nav-item">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </header>
  );
}