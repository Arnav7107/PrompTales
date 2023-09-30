import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/PromptSubmissionForm.css';
import { Link, useNavigate, useLocation } from "react-router-dom";


const Liked = () => {
  const [savedStories, setSavedStories] = useState([]);
  const location = useLocation();
  const userEmail = location.state && location.state.email;


  useEffect(() => {
    console.log("Before req");
        axios.get('http://localhost:4000/getliked',{
        headers: {
            'X-User-Email': userEmail, 
          }
    })
    
      .then(response => {
        setSavedStories(response.data.likedStories); 
      })
      .catch(error => {
        console.error('Error fetching saved stories:', error);
      });
      console.log("After req");
  }, []);

  const handleRemoveFromSaved = async (storyId) => {
    try {
      // Make an API call to remove the story from the saved list on the server.
      // Replace 'userEmail' with the user's email if needed.
      console.log(storyId);
      console.log("Before axios req")
      const response = await axios.post('http://localhost:4000/removefromliked', {
        storyId: storyId,
    
      })
      console.log("After axios req")
    //   Handle the response if needed
      console.log('Story removed from Liked:', response.data);
  
      // After successfully removing the story, you may want to update the savedStories state
      // to reflect the changes and re-render the component.
      // For example, you can filter out the removed story from the savedStories array:
      setSavedStories(savedStories.filter((story) => story._id !== storyId));
    } catch (error) {
      console.error('Error while removing the story:', error);
    }
  };
  

  return (
    <div style={{color:"white"}}>
      <ul>
          <div className="generated-story-container">
        <h1 className='heading'>Liked Stories</h1>
        {savedStories.map((story) => (
          <div key={story._id} className="story-container">
            <strong>Prompt:</strong> {story.storyPrompt}
            <p>Story: {story.generatedStory}</p>
            <button className="remove-button" onClick={() => handleRemoveFromSaved(story._id)}>Remove </button>
            {/* <p>Story:(""As the darkness of the night begins to recede, the world awakens to a breathtaking spectacle that never fails to inspire awe and wonder—the sunrise. This daily ritual of nature is a timeless reminder of the beauty and grandeur that surrounds us. As the first rays of the sun pierce the horizon, the sky transforms from inky black to a palette of soft pastels. The colors dance and blend together in perfect harmony, painting a picture that is both serene and exhilarating. The cool blues and purples gradually give way to warm shades of pink, orange, and gold, as if the heavens themselves are announcing the arrival of a new day. The world below stirs with life, as the creatures of the earth greet the dawn with songs and calls. The gentle warmth of the sun's rays touches everything it reaches, bringing with it a promise of hope and renewal. It is a moment of pure magic, when time seems to stand still, and the worries of the world momentarily fade away. Witnessing a sunrise is a reminder that each day is a fresh start, a chance to begin anew. It's a testament to the incredible beauty that exists in the natural world, a beauty that is often overlooked in the hustle and bustle of daily life.In those precious moments when the sun emerges, casting its golden glow across the landscape, we are reminded of the simple joys of existence. We are reminded to pause, to appreciate, and to be grateful for the world we inhabit.")</p> */}
          </div>
        ))}
      </div>
        
      </ul>
    </div>
  );
};

export default Liked;
