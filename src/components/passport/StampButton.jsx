import { usePassport } from '../../context/PassportContext';
import './StampButton.css';

export default function StampButton({ park, customStyle }) {
  const { visitedParks, stampPark, removePark } = usePassport();
  const isStamped = visitedParks.some((p) => p.id === park.id);

  const handleToggle = () => {
    if (isStamped) {
      removePark(park.id); 
    } else {
      stampPark(park);     
    }
  };

  return (
    <button 
      onClick={handleToggle}
      className={`stamp-btn ${isStamped ? 'is-stamped' : 'not-stamped'}`}
      style={customStyle}
    >
      {isStamped ? "✓ Stamped (Click to Undo)" : "Stamp Passport"}
    </button>
  );
}