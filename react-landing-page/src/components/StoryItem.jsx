import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBookmark, faShare,faExternalLinkAlt  } from '@fortawesome/free-solid-svg-icons';
import '../styles/StylishNavbar.css'; 
import axios from "axios";
import ClipboardJS from 'clipboard'; 


const StoryItem = ({ story,email, prompt, generatedStory }) => {
    console.log(story);
    console.log(email);
    console.log(prompt);
    console.log(generatedStory);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [sharedLink, setSharedLink] = useState('');
//   const email = {story.email}

useEffect(() => {
  const clipboard = new ClipboardJS('.copy-button');

  // Handle successful copy
  clipboard.on('success', () => {
    console.log('Link copied to clipboard');
    // You can add any additional feedback to the user here.
  });

  // Clean up clipboard.js when the component unmounts
  return () => {
    clipboard.destroy();
  };
}, []);


useEffect(() => {
  const likedStatus = localStorage.getItem(`liked_${story._id}`);
  const savedStatus = localStorage.getItem(`saved_${story._id}`);

  if (likedStatus === 'true') {
    setIsLiked(true);
  }

  if (savedStatus === 'true') {
    setIsSaved(true);
  }
}, [story._id]);


  // const handleToggleLike = async () => {
  //   // Toggle the like status for the specific story here.
  //   setIsLiked(!isLiked);
  //   localStorage.setItem(`liked_${story._id}`, !isLiked);
  //   try {
        
  //       const response = await axios.post('http://localhost:4000/like', {
            
  //      email: email,         
  //     storyId: story._id,    
  //     storyPrompt: prompt,   
  //     generatedStory: generatedStory, 
  //       },
  //       { withCredentials: true }
  //       );
    
  //       // Handle the response if needed
  //       console.log('Story saved successfully:', response.data);
    
  //       // Update the local state (isSaved) if necessary.
  //       // setIsSaved(!isSaved);
  //     } catch (error) {
  //       console.error('Error while saving the story:', error);
  //     }
  // };


  const handleToggleLike = async () => {
    try {
      // Check if the story is already liked
      if (!isLiked) {
        // Toggle the like status for the specific story here.
        setIsLiked(true);
        localStorage.setItem(`liked_${story._id}`, 'true');
        
        const response = await axios.post('http://localhost:4000/like', {
          email: email,         
          storyId: story._id,    
          storyPrompt: prompt,   
          generatedStory: generatedStory, 
        }, { withCredentials: true });
  
        // Handle the response if needed
        console.log('Story liked successfully:', response.data);
      } else {
        // If it's already liked, show a message or handle it as desired
        console.log('Story is already liked');
      }
    } catch (error) {
      console.error('Error while liking the story:', error);
    }
  };
  

  // const handleToggleSave = async () => {
  //   // Toggle the save status for the specific story here.
  //   setIsSaved(!isSaved);
  //   localStorage.setItem(`saved_${story._id}`, !isSaved);
  //   try {
        
  //       const response = await axios.post('http://localhost:4000/save', {
            
  //      email: email,         
  //     storyId: story._id,    
  //     storyPrompt: prompt,   
  //     generatedStory: generatedStory, 
  //       },
  //       { withCredentials: true }
  //       );
    
  //       // Handle the response if needed
  //       console.log('Story saved successfully:', response.data);
    
  //       // Update the local state (isSaved) if necessary.
  //       setIsSaved(!isSaved);
  //     } catch (error) {
  //       console.error('Error while saving the story:', error);
  //     }
  // };

  const handleToggleSave = async () => {
    try {
      // Check if the story is already saved
      if (!isSaved) {
        // Toggle the save status for the specific story here.
        setIsSaved(true);
        localStorage.setItem(`saved_${story._id}`, 'true');
        
        const response = await axios.post('http://localhost:4000/save', {
          email: email,         
          storyId: story._id,    
          storyPrompt: prompt,   
          generatedStory: generatedStory, 
        }, { withCredentials: true });
  
        // Handle the response if needed
        console.log('Story saved successfully:', response.data);
      } else {
        // If it's already saved, show a message or handle it as desired
        localStorage.removeItem(`saved_${story._id}`);
        setIsSaved(false)
        
        console.log('Story is already saved');
      }
    } catch (error) {
      console.error('Error while saving the story:', error);
    }
  };
  


  // const handleShare = () => {
  //   // Generate the shared link based on the story's unique identifier
  //   const uniqueIdentifier = story._id; // Replace with your actual identifier

  //   // Construct the shared link
  //   const shareableLink = `http://example.com/story/${uniqueIdentifier}`;

  //   // Copy the link to the clipboard (you can use a library like clipboard.js)
  //   copyToClipboard(shareableLink);

  //   // Set the shared link in state for display
  //   setSharedLink(shareableLink);
  // };

  const handleShare = () => {
    // Generate the shared link based on the story's unique identifier
    const uniqueIdentifier = story._id; // Replace with your actual identifier

    // Construct the shared link
    const shareableLink = `http://example.com/story/${uniqueIdentifier}`;

    // Set the shared link in state for display
    setSharedLink(shareableLink);
  };

  return (
    <div>
        <div key={story._id} className="story-container">
          <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <p><h5>PROMPT :</h5> 
            
              {story.storyPrompt}
            </p>
          </div>
          <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <p><h5>STORY :</h5>
            
              {story.generatedStory}
            </p>
          </div>
      
      {/* <p>{story.email}</p> */}
      <div style={{ display:'flex', alignItems: 'end', justifyContent:'end', marginRight:'40px' }}>
      <button onClick={handleToggleLike} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <FontAwesomeIcon icon={faHeart} style={{ color: isLiked ? 'red' : 'white', fontSize: '24px' }} />
      </button>
      <button onClick={handleToggleSave} style={{ background: 'none', border: 'none', cursor: 'pointer' ,paddingLeft:'25px' }}>
        <FontAwesomeIcon icon={faBookmark} style={{ color: isSaved ? 'lightgreen' : 'gray', fontSize: '24px' }} />
      </button>
      <button onClick={handleShare} style={{ background: 'none', border: 'none', cursor: 'pointer', paddingLeft: '25px' }}>
            <FontAwesomeIcon icon={faExternalLinkAlt } style={{ color: 'lightgoldenrodyellow', fontSize: '24px' }} />
          </button>
        </div>
        {sharedLink && (
          <div>
            <p>Shared Link: {sharedLink}</p>
          </div>
        )}
      </div>
      </div>
    
  );
};

export default StoryItem;
