const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true, trim: true },
  caption: { type: String },
  filename: { type: String, required: true },
  id: { type: mongoose.Schema.Types.ObjectId, required: true }  // Reference to GFS
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;