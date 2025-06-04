import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;
const NASA_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';

app.get('/', (req, res) => {
  res.send('<h1>NASA Service</h1><p>Use <a href="/apod">/apod</a> or <a href="/mars-photos">/mars-photos</a></p>');
});

app.get('/apod', async (req, res) => {
  try {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch APOD' });
  }
});

app.get('/mars-photos', async (req, res) => {
  const { sol = 1000, camera = 'fhaz' } = req.query;
  try {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${camera}&api_key=${NASA_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Mars photos' });
  }
});

app.listen(PORT, () => {
  console.log(`NASA service running on http://localhost:${PORT}`);
});
