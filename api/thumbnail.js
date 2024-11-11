const express = require("express");
const axios = require("axios");
const app = express();

app.get("/thumbnail", async (req, res) => {
  const { videoId } = req.query;
  
  if (!videoId) {
    return res.status(400).send("Video ID is required.");
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  try {
    // Fetch the image (max resolution)
    const response = await axios.get(thumbnailUrl, { responseType: "arraybuffer" });
    
    // Send back the image as a response
    res.set("Content-Type", "image/jpeg");
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Failed to fetch the thumbnail.");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
