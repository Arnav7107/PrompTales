const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  email: {
    type: String,
    // required: true,
    lowercase: true,
  },
  storyPrompt: {
    type: String,
    required: true,
  },
  generatedStory: {
    type: String,
    // required: true,
  },
  upvotes: {
    type: Number,
    default: 0, // Default value is 0
  },
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;