const User = require("../Models/authModel");
const jwt = require("jsonwebtoken");
const Story = require('../Models/storyModel');
const Save = require("../Models/saveModel");
const Like = require("../Models/likeModel");
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.open_ai_key 
});

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "super secret key", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  console.log(err);
  if (err.message === "incorrect email") {
    errors.email = "Email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "Incorrect Password";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ email:email, user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ email:email, user: user._id, status: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};




module.exports.createStory = async(req,res,next) =>
{
    try {
      const { prompt } = req.body;
      const { upvotes } = req.body;
      const { email } = req.body;
      const completion = await openai.completions.create({
        model: "text-davinci-003",
        prompt: `Write a story on the following prompt: ${prompt}`,
        max_tokens: 5,
      });
      
      console.log(completion.choices[0].text);
      const generatedStory = completion.choices[0].text
      // res.status(201).json({PROMPT: prompt, GENERATED_STORY: generatedStory});
      const story = await Story.create({generatedStory:completion.choices[0].text,storyPrompt: prompt,upvotes:upvotes,email:email });
      const savedStory = await story.save();
      const savedStoryId = savedStory._id;
      console.log(savedStoryId);
      res.status(201).json({ PROMPT: prompt, GENERATED_STORY: generatedStory, _id: savedStoryId });
      
      // .then(() =>{
      //     console.log("Prompt and Story Saved Successfully");
      // });
      // res.status(201).json({PROMPT: prompt, GENERATED_STORY: generatedStory});
      
    }
    catch(error) {
      console.error('Error saving story: ', error);
      
    }
};


module.exports.updateLike = async(req,res,next)=>
{
  const storyId = req.body;

  try {
    // Find the story document by its ID
    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    // Increment the upvotes field by 1 (or any desired value)
    console.log(story.prompt);
    story.upvotes += 1;

    // Save the updated story
    await story.save();

    return res.status(200).json({ message: 'Upvote updated successfully', story });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

}

module.exports.getStories = async(req,res,next)=>{
  try {
    // Fetch all stories from the database
    const stories = await Story.find();

    // Send the stories as a JSON response
    res.json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ error: 'Error fetching stories' });
  }
}


module.exports.saveStory = async(req,res)=>{
  try {
    // Extract data from the request body
    const { email, storyPrompt, generatedStory, upvotes } = req.body;

    // Create a new instance of the Save model
    const saveData = new Save({
      email,
      storyPrompt,
      generatedStory,
      upvotes,
    });

    // Save the data to the database
    const savedData = await saveData.save();

    res.status(201).json(savedData); // Send a response with the saved data
  } catch (error) {
    console.error('Error while saving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.getSaved = async(req,res)=>{
  try {
    // Query the database to get saved stories (adjust the query as per your schema)
    const userEmail = req.headers['x-user-email'];
    console.log('User Email:', userEmail);
    console.log(`Fetching saved stories for user: ${userEmail}`);
    // const savedStories = await Save.find({userEmail: userEmail});
    const savedStories = await Save.find({email:userEmail});
    console.log(`Found ${savedStories.length} saved stories for user: ${userEmail}`);

    res.json({ savedStories });
  } catch (error) {
    console.error('Error fetching saved stories:', error);
    res.status(500).json({ error: 'Failed to fetch saved stories' });
  }

};


// Route handler for removing a story from saved
module.exports.removeFromSaved = async (req, res) => {
  try {
    const { storyId } = req.body;
    console.log(storyId);
    await Save.findByIdAndRemove(storyId);

    res.json({ message: 'Story removed from saved successfully' });
  } catch (error) {
    console.error('Error removing story from saved:', error);
    res.status(500).json({ error: 'Failed to remove story from saved' });
  }
};


// module.exports.likeStory = async(req,res)=>{
//   try {
//     // Extract data from the request body
//     const { email, storyPrompt, generatedStory, upvotes } = req.body;

//     // Create a new instance of the Save model
//     const saveData = new Like({
//       email,
//       storyPrompt,
//       generatedStory,
//       upvotes,
//     });

//     // Save the data to the database
//     const savedData = await saveData.save();

//     res.status(201).json(savedData); // Send a response with the saved data
//   } catch (error) {
//     console.error('Error while saving data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };



module.exports.likeStory = async (req, res) => {
  try {
    // Extract data from the request body
    const { email, storyId, storyPrompt, generatedStory } = req.body;

    // Find an existing Like entry for the story
    let likeEntry = await Like.findOne({ email, storyId });

    if (!likeEntry) {
      // If there's no existing Like entry, create a new one
      likeEntry = new Like({
        email,
        storyPrompt,
        generatedStory,
      });
    }

    // Increment the upvotes count in the Like entry
    likeEntry.upvotes += 1;

    // Save the Like entry
    const updatedLikeEntry = await likeEntry.save();

    res.status(200).json(updatedLikeEntry); // Send a response with the updated Like entry
  } catch (error) {
    console.error('Error while liking the story:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports.getLiked = async(req,res)=>{
  try {
    // Query the database to get saved stories (adjust the query as per your schema)
    const userEmail = req.headers['x-user-email'];
    console.log('User Email:', userEmail);
    console.log(`Fetching saved stories for user: ${userEmail}`);
    // const savedStories = await Save.find({userEmail: userEmail});
    const likedStories = await Like.find({email:userEmail});
    console.log(`Found ${likedStories.length} saved stories for user: ${userEmail}`);

    res.json({ likedStories });
  } catch (error) {
    console.error('Error fetching saved stories:', error);
    res.status(500).json({ error: 'Failed to fetch saved stories' });
  }

}

module.exports.removeFromLiked = async (req, res) => {
  try {
    const { storyId } = req.body;
    console.log(storyId);
    await Like.findByIdAndRemove(storyId);

    res.json({ message: 'Story removed from liked successfully' });
  } catch (error) {
    console.error('Error removing story from liked:', error);
    res.status(500).json({ error: 'Failed to remove story from liked' });
  }
};