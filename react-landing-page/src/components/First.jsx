import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import '../styles/StylishNavbar.css'; 
import { useNavigate, Link,useLocation  } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import StoryItem from "./StoryItem";


function First (props) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [stories, setStories] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
  // const email = props.location.state.email;
  // const email = props.location.state ? props.location.state.email : '';
  const location = useLocation();
  const email = location.state && location.state.email;

  const handleToggleLike = () =>{
    setIsLiked(true);
    console.log("Like is pressed");
  }

  
  const handleToggleSave = () =>{
    setIsSaved(true);
    console.log("Save is pressed");
  }

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } 
        // else{}
        //   toast(`Hi ${data.user} `, {
        //     theme: "dark",
        //   });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/stories");
        const stories = response.data; // Assuming your API returns an array of stories
        setStories(stories);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchStories();
  }, []);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  const reversedStories = [...stories].reverse()
  return (
    <>
    <Navbar expand="lg" className="custom-navbar">
      <Navbar.Brand classname="heading" href="#home" style={{color:'white' ,fontWeight:'bold', paddingLeft:'20px'}}>PromptTales</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {/* <Nav.Link href="/dashboard">Home</Nav.Link> */}
          {/* <Nav.Link href="#about">About</Nav.Link> */}
          <Link to="/dashboard" className="private " style={{color: '#fff', 
    marginLeft:'15px', FontSize:'24px',paddingTop:'10px', fontWeight:'600'}}>Home</Link>
    <Link to="/create" className="private " style={{color: '#fff', 
    marginLeft:'15px', FontSize:'24px',paddingTop:'10px', fontWeight:'600'}}state={{ email }}>Create</Link>
          <Link to="/getliked"  className="private " style={{color: '#fff', 
    marginLeft:'15px', FontSize:'24px',paddingTop:'10px', fontWeight:'600'}}state={{ email }}>Liked</Link>
          <Link to="/getsaved" className="private " style={{color: '#fff', 
    marginLeft:'15px', FontSize:'24px',paddingTop:'10px', fontWeight:'600'}}state={{ email }}>Saved</Link>
          {/* <Nav.Link href="create">Create</Nav.Link> */}
          {/* <Link to="/create" state={{ email }}></Link><Nav.Link href="create">Create</Nav.Link> */}
          
          <div className="private ">
        <button style={{color:'white'}} onClick={logOut}>Log out</button>
      </div>
      <ToastContainer />
        </Nav>
      </Navbar.Collapse> 
    </Navbar>
<div className="generated-story-container">
        <h1 className='heading'>Stories </h1>
        {reversedStories.map((story) => (
              <StoryItem key={story._id} story={story} email={email}                   
              prompt={story.storyPrompt}     
              generatedStory={story.generatedStory}  />
          // <div key={story._id} className="story-container">
          //   <strong>Prompt:</strong> {story.storyPrompt}
          //   <p>Story: {story.generatedStory}</p>
    //       <div style={{ display:'flex', alignItems: 'end', justifyContent:'end', marginRight:'40px' }}>
    //   <button onClick={handleToggleLike} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
    //     <FontAwesomeIcon icon={faHeart} style={{ color: isLiked ? 'red' : 'white', fontSize: '24px' }} />
    //   </button>
    //   <button onClick={handleToggleSave} style={{ background: 'none', border: 'none', cursor: 'pointer' ,paddingLeft:'25px' }}>
    //           {isSaved ? (
    //             <FontAwesomeIcon icon={faBookmark} style={{ color: 'cyan', fontSize: '24px' }} />
    //           ) : (
    //             <FontAwesomeIcon icon={faBookmark} style={{ color: 'gray', fontSize: '24px' }} />
    //           )}
    //         </button>
    //   {/* <span className='p-2'>{likes}</span> */}
    // </div>
    //       </div>
    
        ))}
       </div>
    </>

   

     
    
   );
        }
  
    
export default First;
