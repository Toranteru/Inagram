const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Core Node.js modules
const path = require('path');
const crypto = require('crypto');

// Modules for parsing files into chunks
const multer = require('multer');
const gridFsStorage = require('multer-gridfs-storage');
const gridFsStream = require('gridfs-stream');
const methodOverride = require('method-override');

require('dotenv').config();

// Routers
const postsRouter = require('./routes/posts');

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.DB_URI;

// Middleware
app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));

// Mongo URI
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

// Create storage engine
const storage = new gridFsStorage({
  url: process.env.DB_URI,
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

// Application routes
app.use('/posts', postsRouter);

app.listen(port, () => {
  console.log(`The server is running on port: ${port}!`);
});