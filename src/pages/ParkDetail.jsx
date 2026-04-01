import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchParkDetails } from '../services/npsAPI';

export default function ParkDetail() {
  const { parkCode } = useParams();
  const [park, setPark] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getParkData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchParkDetails(parkCode);
        
        if (data) {
          setPark(data);
        } else {
          setError("Could not find details for this park.");
        }
      } catch (err) {
        console.error("Error fetching park details:", err);
        setError("Failed to load park information.");
      } finally {
        setIsLoading(false);
      }
    };

    getParkData();
  }, [parkCode]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] bg-stone-50">
        <div className="text-xl font-semibold text-stone-600 animate-pulse">Loading park details...</div>
      </div>
    );
  }

  if (error || !park) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-stone-50 gap-4">
        <div className="text-red-500 font-semibold text-xl">{error}</div>
        <Link to="/" className="text-emerald-700 hover:underline font-medium">← Return to Map</Link>
      </div>
    );
  }

  const heroImage = park.images && park.images.length > 0 ? park.images[0] : null;
  const galleryImages = park.images && park.images.length > 1 ? park.images.slice(1, 4) : [];
  const voicePhone = park.contacts?.phoneNumbers?.find(p => p.type === "Voice")?.phoneNumber;
  const email = park.contacts?.emailAddresses?.[0]?.emailAddress;
  const activities = park?.activities || [];

  return (
    <div className="bg-stone-50 min-h-screen pb-20 font-sans text-stone-900">
      
      <div className="relative h-[40vh] md:h-[50vh] w-full bg-stone-900">
        {heroImage && (
          <>
            <img 
              src={heroImage.url} 
              alt={heroImage.altText || park.fullName} 
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          </>
        )}
        
        <div className="absolute bottom-0 w-full p-6 md:p-12 max-w-7xl mx-auto left-0 right-0">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight drop-shadow-md">
            {park.fullName}
          </h1>
          <p className="text-stone-200 text-lg md:text-xl font-medium drop-shadow-md">
            {park.designation} • {park.states}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        
        <Link to="/" className="inline-flex items-center text-emerald-700 hover:text-emerald-800 font-bold mb-8 transition-colors">
          ← Back to Explorer"
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <div className="lg:col-span-2 space-y-12">
            
            <section>
              <h2 className="text-3xl font-bold text-stone-900 mb-6">About the Park</h2>
              <p className="text-stone-700 leading-relaxed text-lg">
                {park.description}
              </p>
            </section>


            {park.operatingHours && park.operatingHours.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-stone-900 mb-6 border-t border-stone-200 pt-8">Operating Hours & Seasons</h2>
                <div className="space-y-6">
                  {park.operatingHours.map((hours, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                      <h3 className="text-xl font-bold text-stone-800 mb-2">{hours.name}</h3>
                      <p className="text-stone-600 mb-4">{hours.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {park.weatherInfo && (
              <section>
                <h2 className="text-2xl font-bold text-stone-900 mb-4 border-t border-stone-200 pt-8">Weather & Climate</h2>
                <p className="text-stone-700 leading-relaxed mb-4">
                  {park.weatherInfo}
                </p>
                <a 
                  href={`https://www.nps.gov/${park.parkCode}/planyourvisit/weather.htm`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 hover:text-emerald-900 font-semibold"
                >
                  Check Current Weather Conditions ⤴︎
                </a>
              </section>
            )}

            {activities.length > 0 && (
              <section className="border-t border-stone-200 pt-8 mt-8">
                <h2 className="text-2xl font-bold text-stone-900 mb-6">Activities</h2>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {activities.map((activity) => (
                    <span
                      key={activity.id}
                      className="bg-neutral-100 text-gold-800 border border-white-200 px-2 py-2 rounded-full text-sm font-medium shadow-sm"
                      >
                        {activity.name}
                      </span>
                  ))}
                </div>
              </section>
            )}

            {galleryImages.length > 0 && (
              <section className="border-t border-stone-200 pt-8">
                <h2 className="text-2xl font-bold text-stone-900 mb-6">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {galleryImages.map((img, index) => (
                    <div key={index} className="aspect-square rounded-xl overflow-hidden shadow-sm bg-stone-200">
                      <img 
                        src={img.url} 
                        alt={img.altText || `Park image ${index + 1}`} 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-24">
              
              <div className="flex flex-col gap-3">
                {park.url && (
                  <a href={park.url} target="_blank" rel="noopener noreferrer" className="w-full py-4
                   bg-stone-900 hover:bg-black text-white text-center font-bold rounded-xl transition-colors shadow-md">
                    Visit Official Park Site
                  </a>
                )}
                {park.directionsUrl && (
                  <a href={park.directionsUrl} target="_blank" rel="noopener noreferrer" className="w-full py-4 bg-emerald-700 
                  hover:bg-emerald-800 text-white text-center font-bold rounded-xl transition-colors shadow-md">
                    Get Directions & Maps
                  </a>
                )}
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 space-y-8">
                
                {park.entranceFees && park.entranceFees.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center">
                      Entrance Fees
                    </h3>
                    <ul className="space-y-3">
                      {park.entranceFees.map((fee, index) => (
                        <li key={index} className="flex justify-between items-start border-b border-stone-100 pb-2 last:border-0">
                          <span className="text-sm text-stone-600 pr-4">{fee.title}</span>
                          <span className="font-bold text-emerald-800">${parseFloat(fee.cost).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {park.entrancePasses && park.entrancePasses.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 mb-4">Annual Passes</h3>
                    <ul className="space-y-3">
                      {park.entrancePasses.map((pass, index) => (
                        <li key={index} className="flex justify-between items-start border-b border-stone-100 pb-2 last:border-0">
                          <span className="text-sm text-stone-600 pr-4">{pass.title}</span>
                          <span className="font-bold text-emerald-800">${parseFloat(pass.cost).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(voicePhone || email) && (
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center">
                      Contact Info
                    </h3>
                    <div className="space-y-2 text-sm text-stone-600">
                      {voicePhone && <p>Phone: {voicePhone}</p>}
                      {email && <p>Email: <a href={`mailto:${email}`} className="text-emerald-700 hover:underline">{email}</a></p>}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}