import { useParams } from 'react-router-dom';

export default function PreviewPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Previewing Draft Page</h1>
      <p>Preview ID: {id}</p>
    </div>
  );
}