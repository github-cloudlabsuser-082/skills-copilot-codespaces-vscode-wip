// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

// Create a new Express application
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create a post route
app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  console.log('Event received:', type);

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentModerated',
      data: { ...data, status },
    });
  }

  res.send({});
});

// Start listening on port 4003
app.listen(4003, () => {
  console.log('Listening on 4003');
});