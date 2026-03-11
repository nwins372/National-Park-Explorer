import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchParkDetails } from '../services/npsAPI';
import { usePassport } from '../context/PassportContext';
import StampButton from '../components/passport/StampButton';
import './ParkDetail.css';

export default function ParkDetail() {
  const { id } = useParams(); 
  const { visitedParks, stampPark } = usePassport();

  const [park, setPark] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      const data = await fetchParkDetails(id);
      
      if (data) {
        setPark(data);
      } else {
        setError("Could not load park details.");
      }
      setIsLoading(false);
    };

    getDetails();
  }, [id]);

  if (isLoading) return <h2 style={{ textAlign: 'center', marginTop: '3rem' }}>Loading park details...</h2>;
  if (error || !park) return <h2 style={{ textAlign: 'center', color: 'red' }}>{error}</h2>;

  const isStamped = visitedParks.some((p) => p.id === park.id);
  const heroImage = park.images && park.images.length > 0 ? park.images[0].url : '';

  return (
    <div className="park-detail-container">
      {heroImage && (
        <img src={heroImage} alt={park.fullName} className="park-hero" />
      )}
      
      <div className="park-content">
        <Link to="/" style={{ color: '#3498db', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>
          &larr; Back to Map
        </Link>

        <div className="park-header">
          <div className="park-title">
            <h1>{park.fullName}</h1>
            <p>{park.designation} • {park.states}</p>
          </div>
          
            <StampButton 
                park={park} 
                customStyle={{ padding: '12px 24px', fontSize: '1.1rem', width: 'auto' }} 
            />
        </div>

        <p className="park-description">{park.description}</p>

        {/* --- MAIN INFO GRID --- */}
        <div className="info-grid">
          
          {/* Plan Your Visit */}
          <div className="info-section">
            <h3>Plan Your Visit</h3>
            {park.operatingHours?.[0] && (
              <div style={{ marginBottom: '15px' }}>
                <strong>Operating Hours: </strong> 
                <p style={{ marginTop: '5px', fontSize: '0.95rem', color: '#34495e' }}>
                  {park.operatingHours[0].description}
                </p>
              </div>
            )}
            {park.directionsInfo && (
              <div>
                <strong>Directions: </strong>
                <p style={{ marginTop: '5px', fontSize: '0.95rem', color: '#34495e' }}>
                  {park.directionsInfo}
                </p>
              </div>
            )}
          </div>

          <div className="info-section">
            <h3>Entrance Fees</h3>
            {park.entranceFees && park.entranceFees.length > 0 ? (
              <div className="fees-list">
                {park.entranceFees.slice(0, 3).map((fee, index) => (
                  <div key={index} className="fee-item">
                    <span className="fee-cost">${parseFloat(fee.cost).toFixed(2)}</span>
                    <span className="fee-title">{fee.title}</span>
                    <span className="fee-desc">{fee.description}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No fee information available.</p>
            )}
          </div>

          {/* Activities */}
          <div className="info-section" style={{ gridColumn: '1 / -1' }}>
            <h3>Popular Activities</h3>
            <div className="activity-tags">
              {park.activities?.slice(0, 15).map(activity => (
                <span key={activity.id} className="activity-tag">
                  {activity.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* --- IMAGE GALLERY --- */}
        {park.images && park.images.length > 1 && (
          <div className="gallery-section">
            <h3>Photo Gallery</h3>
            <div className="gallery-grid">
              {park.images.slice(1, 5).map((image, index) => (
                <img 
                  key={index}
                  src={image.url} 
                  alt={image.altText || park.fullName}
                  className="gallery-img"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        )}

        {/* --- CONTACT FOOTER --- */}
        <div className="contact-footer">
          <div>
            <h4>Contact Email</h4>
            <p>{park.contacts?.emailAddresses?.[0]?.emailAddress || 'Not provided'}</p>
          </div>
          <div>
            <h4>Phone Number</h4>
            <p>{park.contacts?.phoneNumbers?.[0]?.phoneNumber || 'Not provided'}</p>
          </div>
          <div>
            <h4>Location</h4>
            <p>{park.addresses?.[0]?.city}, {park.addresses?.[0]?.stateCode} {park.addresses?.[0]?.postalCode}</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}