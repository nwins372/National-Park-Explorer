// We no longer need useState, useEffect, or fetchParks here
import { usePassport } from '../context/PassportContext'; 
import Map from '../components/Map/Map';
import FeaturedParks from '../components/FeaturedParks/FeaturedParks';
import './Home.css'; 

export default function Home() {
  // Simply pull the cached data and loading status from Context
  const { parks, isLoading } = usePassport();

  return (
    <div className="home-container">
      
      <div className="hero-section">
        <h1>National Park Explorer</h1>
        <p>Plan your trips and stamp your digital passport.</p>
      </div>

      {isLoading ? (
        <p className="loading-text">Loading park data from the National Park Service...</p>
      ) : (
        <>
            <div className="map-wrapper">
                <Map parks={parks} />
            </div>
            <FeaturedParks parks={parks} />
        </>
      )}
    </div>
  );
}