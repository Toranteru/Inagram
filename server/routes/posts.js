const mongoose = require('mongoose');

// Core Node.js modules
const path = require('path');
const crypto = require('crypto');

// Modules for parsing files into chunks
const multer = require('multer');
const gridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const gridFsStream = require('gridfs-stream');

const router = require('express').Router();
let Post = require('../models/post.model');

const uri = process.env.DB_URI;

// Create storage engine
const storage = new gridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      // Crypto is used to generate names for the files
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'posts' // This needs to match the collection name
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

mongoose.connect(uri);
const connection = mongoose.connection;

// Initialize GFS
let gfs;

connection.once('open', () => {
  gfs = gridFsStream(connection.db, mongoose.mongo);
  // Specify the top level connection name
  gfs.collection('posts');
  console.log("MongoDB connection established successfully!");
})

// @route GET /
// @desc Retrieve all posts in the collection
router.get('/', async (req, res) => {
  Post.find()
  .then(posts => res.json(posts))
  .catch(err => res.status(400).json(`Error with message: ${error}`));
});

// @route POST /submit
// @desc Add a new post in the collection
router.post('/submit', async (req, res) => {
  // Destructuring
  const { title, caption, date } = req.body;
  const newPost = new Post({
    title,
    caption,
    date
  });

  newPost.save()
  .then(() => res.json('A new post has been added!'))
  .catch(err => res.status(400).json(`Error with message: ${error}`));
});

// @route POST /upload
// @desc Add a new image in the collection
// TODO: This is a test route, will depreciate later
router.post('/upload', upload.single('file'), async (req, res) => {
  res.json({ file: req.file });
});

module.exports = router;