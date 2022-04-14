const express = require('express');
const cors = require('cors');

require('dotenv').config();

// Routers
const postsRouter = require('./routes/posts');

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.DB_URI;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Application routes
app.use('/posts', postsRouter);

app.listen(port, () => {
  console.log(`The server is running on port: ${port}!`);
});