import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = process.env.BOARD_FILE || path.join(__dirname, 'board.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

async function readData() {
  try {
    const text = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(text);
  } catch {
    return [];
  }
}

async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/board', async (req, res) => {
  res.json(await readData());
});

app.post('/api/board', async (req, res) => {
  await writeData(req.body);
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Trello clone service running on http://localhost:${PORT}`);
});
