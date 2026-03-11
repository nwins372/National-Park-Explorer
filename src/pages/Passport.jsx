import { usePassport } from '../context/PassportContext';
import { Link } from 'react-router-dom';
import './Passport.css';

export default function Passport() {
 
  const { visitedParks, removePark } = usePassport();

  return (
    <div className="passport-container">
      <div className="passport-header">
        <h1>My National Park Passport</h1>
        <p>You have collected {visitedParks.length} stamps.</p>
      </div>

      {visitedParks.length === 0 ? (
        <div className="empty-state">
          <h2>Your passport is empty!</h2>
          <p>Head over to the map to start tracking your adventures.</p>
          <Link to="/" style={{ color: '#2980b9', fontWeight: 'bold' }}>
            Go to Map
          </Link>
        </div>
      ) : (
  
        <div className="stamp-grid">
          {visitedParks.map((park) => (
            <div key={park.id} className="stamp-card">
              <div>
                <h3>{park.fullName}</h3>
                <p><strong>Location:</strong> {park.states}</p>
              </div>
              
              <button 
                className="remove-btn"
                onClick={() => removePark(park.id)}
              >
                Remove Stamp
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}