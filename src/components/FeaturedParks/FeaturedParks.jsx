import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link
import './FeaturedParks.css'; 

export default function FeaturedParks({ parks }) {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    if (parks.length > 0) {
      const shuffled = [...parks].sort(() => 0.5 - Math.random()).slice(0, 3);
      setFeatured(shuffled);
    }
  }, [parks]); 

  if (featured.length === 0) return null;

  return (
    <div className="featured-section">
      <h2>Featured Parks</h2>
      <div className="featured-grid">
        {featured.map((park) => {
          const imageUrl = park.images && park.images.length > 0 
            ? park.images[0].url 
            : 'https://via.placeholder.com/400x200?text=No+Image+Available';

          return (
         
            <Link 
                to={`/park/${park.parkCode}`} 
                key={park.id} 
                style={{ textDecoration: 'none', color: 'inherit' }} 
            >
                <div className="featured-card">
                  <img 
                    src={imageUrl} 
                    alt={park.images?.[0]?.altText || park.fullName} 
                    className="featured-image"
                    loading="lazy" 
                  />
                  <div className="featured-info">
                    <div>
                      <h3>{park.fullName}</h3>
                      <p>{park.description.substring(0, 120)}...</p>
                    </div>
                  </div>
                </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}