const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true, trim: true },
  caption: { type: String },
  filename: { type: String, required: true } // Reference to filename in storage
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;