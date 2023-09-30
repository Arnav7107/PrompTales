import React from 'react';
import { useParams } from 'react-router-dom';

function GeneratedStoryPage() {
  const { prompt } = useParams();

  return (
    <div>
      <h2>Generated Story</h2>
      <p>Prompt: {decodeURIComponent(prompt)}</p>
      {/* Display the generated story here */}
    </div>
  );
}

export default GeneratedStoryPage;
