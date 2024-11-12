const fetch = require('node-fetch');  // Or any other HTTP client library like axios

module.exports = async (req, res) => {
  const { videoId } = req.query;  // Get the videoId from the query string

  if (!videoId) {
    return res.status(400).json({ error: 'Video ID is required' });
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  try {
    // Fetch the thumbnail image from YouTube
    const response = await fetch(thumbnailUrl);

    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch thumbnail' });
    }

    // Set CORS headers to allow cross-origin requests from your extension (or any domain)
    res.setHeader('Access-Control-Allow-Origin', '*');  // You can replace '*' with specific domains if needed
    res.setHeader('Content-Type', 'image/jpeg');

    // Pipe the response to the client (send the image)
    response.body.pipe(res);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
