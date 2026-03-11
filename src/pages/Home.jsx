import { useState, useEffect } from 'react';
import { fetchParks } from '../services/npsAPI';
import Map from '../components/Map/Map';


export default function Home() {

    const [parks, setParks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getParkData = async() => {
            const parkData = await fetchParks();
            const officialParks = parkData.filter((park) => {

                const designation = park.designation || "";

                const isStandardPark = designation.includes("National Park");

                const isRedwood = park.parkCode === "redw";
                const isAmericanSamoa = park.parkCode === "npsa";

                return isStandardPark || isRedwood || isAmericanSamoa;
            });

            setParks(officialParks);
            console.log("Park Names: ", officialParks.map(p => p.fullName));
            setIsLoading(false);
        };
        getParkData();
    }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>National Park Explorer</h1>
      {isLoading ? (
        <p>Loading park data from NPS...</p>
      ) : (
        <div>
            <p>Successfully located {parks.length} parks</p>
            <p><em>Check browser console</em></p>
            <div style={{height: '400px', background: '#e0e0e0', marginTop: '20px'}}>
                <Map parks={parks} />
            </div>
        </div>
      )}
    </div>
  );
}