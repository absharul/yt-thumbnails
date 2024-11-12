const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Enable CORS for all origins
app.use(cors());

// Endpoint to fetch YouTube thumbnail and return it
app.get('/thumbnail', async (req, res) => {
  const videoId = req.query.videoId; // Get video ID from query parameter

  if (!videoId) {
    return res.status(400).json({ error: 'videoId is required' });
  }

  try {
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    // Fetch the image from the YouTube thumbnail URL
    const response = await axios.get(thumbnailUrl, { responseType: 'arraybuffer' });

    // Set the correct content type for the image
    res.set('Content-Type', 'image/jpeg');
    res.send(response.data); // Send the image data back to the client
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch thumbnail' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
