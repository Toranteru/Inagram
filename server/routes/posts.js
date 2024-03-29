const mongoose = require('mongoose');

// Core Node.js modules
const path = require('path');
const crypto = require('crypto');

// Modules for parsing form data into chunks
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
let gfsBucket;

connection.once('open', () => {
  gfsBucket = new mongoose.mongo.GridFSBucket(connection.db, {
    bucketName: 'posts'
  });
  gfs = gridFsStream(connection.db, mongoose.mongo);
  // Specify the top level connection name
  gfs.collection('posts');
  console.log("MongoDB connection established successfully!");
})

// @route POST /submit
// @desc Add a new post
router.post('/submit', upload.single('image'), async (req, res) => {
  const { title, caption } = req.body;
  const { filename, id } = req.file;
  const newPost = new Post({
    title,
    caption,
    filename,
    id
  });

  newPost.save()
  .then(() => res.json('A new post has been added!'))
  .catch(err => res.status(400).json(`Error with message: ${err}`));
});

// @route GET /
// @desc Retrieve all posts
router.get('/', async (req, res) => {
  Post.find()
  .then(posts => res.json(posts))
  .catch(err => res.status(400).json(`Error with message: ${err}`));
});

// @route GET /:filename
// @desc Get post information associated with file
router.get('/:filename', async (req, res) => {
  let target = req.params.filename;
  Post.findOne({ filename: target })
  .then((fileInfo) => {
    if (!fileInfo) {
      return res.status(404).json({
        err: `Unable to find file or file information with filename ${target}`
      });
    }
    return res.json(fileInfo);
  });
});

// @route GET /image/:filename
// @desc Display post image
router.get('/image/:filename', (req, res) => {
  let target = req.params.filename;
  gfs.files.findOne({ filename: target }, (err, file) => {
    if (!file) {
      return res.status(404).json({
        err: `Unable to find file with filename ${target}`
      }); 
    }
    // Check if the file is an image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readStream = gfsBucket.openDownloadStreamByName(file.filename);
      readStream.pipe(res);
    } else {
      return res.status(404).json({
        err: 'Specified file is not an image'
      })
    }
  });
});

router.delete('/:id', async (req, res) => {
  let { id } = req.params;
  const _id = new mongoose.Types.ObjectId(id);
  await Promise.all([
    Post.find({ id }).remove(),
    gfsBucket.delete(_id)
  ])
  .then(() => res.json('File has been deleted!'))
  .catch(err => res.status(400).json(`Error with message: ${err}`));
})

module.exports = router;