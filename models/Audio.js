const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
    minlength: [3, 'Title must be at least 3 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  genre: {
    type: String,
    required: [true, 'Please select a genre'],
    enum: [
      'fiction',
      'non-fiction',
      'educational',
      'biography',
      'other'
    ]
  },
  audioFile: {
    type: String,
    required: [true, 'Please upload an audio file']
  },
  coverImage: {
    type: String
  },
  duration: {
    type: Number,
    required: true
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

audioSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

audioSchema.pre('remove', async function(next) {
  next();
});

module.exports = mongoose.model('Audio', audioSchema);