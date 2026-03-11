import { useParams } from 'react-router-dom';

export default function ParkDetail() {
  // useParams extracts the dynamic ":id" portion of the URL
  const { id } = useParams();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Park Details</h1>
      <p>Currently viewing data for park ID: <strong>{id}</strong></p>
    </div>
  );
}