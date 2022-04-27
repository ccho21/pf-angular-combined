const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

//  CUSTOM

const path = require('path');
const cors = require('cors');
// const fileUpload = require('express-fileupload');

// Init Middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/comments', require('./routes/api/comments'));
app.use('/api/likes', require('./routes/api/likes'));
app.use('/api/views', require('./routes/api/views'));
app.use('/api/upload', require('./routes/api/upload'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
