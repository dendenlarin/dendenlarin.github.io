const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'board.json');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..')));

function readData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch (e) {
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/board', (req, res) => {
  res.json(readData());
});

app.post('/api/board', (req, res) => {
  writeData(req.body);
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Trello clone service running on http://localhost:${PORT}`);
});
