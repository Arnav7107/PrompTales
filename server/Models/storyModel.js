const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
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

// Create a story model
const Story = mongoose.model('Story', storySchema);

module.exports = Story;
