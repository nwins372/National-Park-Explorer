import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#2c3e50', color: 'white' }}>
      <div className="nav-brand">
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
          NP Explorer
        </Link>
      </div>
      
      <ul style={{ display: 'flex', listStyle: 'none', gap: '20px', margin: 0, padding: 0 }}>
        <li>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Map</Link>
        </li>
        <li>
          <Link to="/passport" style={{ color: 'white', textDecoration: 'none' }}>My Passport</Link>
        </li>
        <li>
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
        </li>
      </ul>
    </nav>
  );
}