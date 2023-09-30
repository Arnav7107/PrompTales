import React, { useState } from 'react';
import '../styles/PromptSubmissionForm.css'; // Import your CSS file
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faHeart,faBookmark } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from "react-router-dom";


function PromptSubmissionForm() {
  const [prompt, setPrompt] = useState('');
  const [generatedStory, setGeneratedStory] = useState(''); // State to store the generated story
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const[id,setId] = useState('');
    const [isSaved, setIsSaved] = useState(false); 
    const location = useLocation();
  const email = location.state && location.state.email;
  console.log(email)
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const navigate = useNavigate();


  // console.log("Before NAvigation");
    // navigate(`/given/${encodeURIComponent(prompt)}`);
    // console.log("After nvaigation");

  const handleSubmit = async (event) => {
    console.log("button clicked");
    event.preventDefault();
    try {
      const response =  await axios.post(
        "http://localhost:4000/create",
        {
          prompt,likes,email
        },
        { withCredentials: true }
      );
      console.log(response.data);
      const { GENERATED_STORY, _id } = response.data;
      // const { id } = response.id;
      
      console.log(_id);
      setGeneratedStory(GENERATED_STORY);
      setId(_id);
      // console.log(generatedStory);
      console.log(_id);
      
    }
     catch (ex) {
      console.log(ex);
    }
    
  };

  const handleSubmit1 = async (event) => {
    event.preventDefault();
    setGeneratedStory("As the darkness of the night begins to recede, the world awakens to a breathtaking spectacle that never fails to inspire awe and wonder—the sunrise. This daily ritual of nature is a timeless reminder of the beauty and grandeur that surrounds us. As the first rays of the sun pierce the horizon, the sky transforms from inky black to a palette of soft pastels. The colors dance and blend together in perfect harmony, painting a picture that is both serene and exhilarating. The cool blues and purples gradually give way to warm shades of pink, orange, and gold, as if the heavens themselves are announcing the arrival of a new day. The world below stirs with life, as the creatures of the earth greet the dawn with songs and calls. The gentle warmth of the sun's rays touches everything it reaches, bringing with it a promise of hope and renewal. It is a moment of pure magic, when time seems to stand still, and the worries of the world momentarily fade away. Witnessing a sunrise is a reminder that each day is a fresh start, a chance to begin anew. It's a testament to the incredible beauty that exists in the natural world, a beauty that is often overlooked in the hustle and bustle of daily life.In those precious moments when the sun emerges, casting its golden glow across the landscape, we are reminded of the simple joys of existence. We are reminded to pause, to appreciate, and to be grateful for the world we inhabit.")
  }

  // const handleToggleLike = async () => {
  //   console.log("toggle like is called");
  //   if (isLiked) {
  //     setLikes(likes - 1);
  //     setIsLiked(false);

  //     // You can also make an API call here to store the unlike action on the server.
  //   } else {
  //     setLikes(likes + 1);
  //     setIsLiked(true);
  //     try {
  //       const response =  await axios.post(
  //         "http://localhost:4000/like:id",
  //         {
  //           id
  //         },
  //         { withCredentials: true }
  //       );
  //       }catch (ex) {
  //         console.log(ex);
  //       }

  //     // You can also make an API call here to store the like action on the server.
  //   }
  // };




const handleToggleSave = async () => {
  if (isSaved) {
    setIsSaved(false);
    // Make an API call to unsave the story on the server if needed.
    try {
      // You can add logic here to unsave the story
      // For example:
      // await axios.post('http://localhost:4000/unsave', { email: userEmail, storyId: storyId });
    } catch (error) {
      console.error('Error while unsaving the story:', error);
    }
  } else {
    setIsSaved(true);
    // Make an API call to save the story on the server if needed.
    try {
      // Replace 'userEmail', 'storyPrompt', 'story', and 'upvotes' with the actual data
      const userEmail = email; // Replace with the user's email
      const storyPrompt = prompt; // Replace with the story prompt
      const story = generatedStory; // Replace with the story content
      const upvotes = 0; // Replace with the number of upvotes

      const response = await axios.post('http://localhost:4000/save', {
        email: userEmail,
        storyPrompt: storyPrompt,
        generatedStory: story,
        upvotes: upvotes,
      },
      { withCredentials: true }
      );
      // Handle the response if needed
      console.log('Story saved successfully:', response.data);
    } catch (error) {
      console.error('Error while saving the story:', error);
    }
  }
};

const handleToggleLike = async () => {
  if (isLiked) {
    setIsLiked(false);
    // Make an API call to unsave the story on the server if needed.
    try {
      // You can add logic here to unsave the story
      // For example:
      // await axios.post('http://localhost:4000/unsave', { email: userEmail, storyId: storyId });
    } catch (error) {
      console.error('Error while unliking the story:', error);
    }
  } else {
    setIsLiked(true);
    // Make an API call to save the story on the server if needed.
    try {
      // Replace 'userEmail', 'storyPrompt', 'story', and 'upvotes' with the actual data
      const userEmail = email; // Replace with the user's email
      const storyPrompt = prompt; // Replace with the story prompt
      const story = generatedStory; // Replace with the story content
      const upvotes = 0; // Replace with the number of upvotes

      const response = await axios.post('http://localhost:4000/like', {
        email: userEmail,
        storyPrompt: storyPrompt,
        generatedStory: story,
        upvotes: upvotes,
      },
      { withCredentials: true }
      );
      // Handle the response if needed
      console.log('Story liked successfully:', response.data);
    } catch (error) {
      console.error('Error while liking the story:', error);
    }
  }
};


  return (
    
    <div className="prompt-form-container">
      <h2 className="prompt-form-header">Submit Your Story Prompt</h2>
      {/* <h4>{email}</h4> */}
      
      {/* <h4>Hello {email}</h4> */}
      <form className="prompt-form" onSubmit={handleSubmit}>
        <textarea
          className="prompt-input"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Enter your story prompt..."
        />
        <button className="submit-button" type="submit">Generate Story</button>
      </form>
      {generatedStory && (
        <div className="generated-story-container">
          <h3>Generated Story:</h3>
          <p>{generatedStory}</p>
          {/* <p>{id}</p> */}

<div style={{ display:'flex', alignItems: 'end', justifyContent:'end', marginRight:'40px' }}>
      <button onClick={handleToggleLike} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <FontAwesomeIcon icon={faHeart} style={{ color: isLiked ? 'red' : 'white', fontSize: '24px' }} />
      </button>
      <button onClick={handleToggleSave} style={{ background: 'none', border: 'none', cursor: 'pointer' ,paddingLeft:'25px' }}>
              {isSaved ? (
                <FontAwesomeIcon icon={faBookmark} style={{ color: 'cyan', fontSize: '24px' }} />
              ) : (
                <FontAwesomeIcon icon={faBookmark} style={{ color: 'gray', fontSize: '24px' }} />
              )}
            </button>
      {/* <span className='p-2'>{likes}</span> */}
    </div>



        </div>
      )} 
    </div>
  );
}


export default PromptSubmissionForm;
