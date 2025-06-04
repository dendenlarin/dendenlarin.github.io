import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { marked } from 'marked';

const app = express();
const PORT = process.env.PORT || 4000;
const __dirname = path.resolve();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'docs-service/public')));

app.get('/docs', async (req, res) => {
  try {
    const files = await fs.readdir(path.join(__dirname, 'docs-service/docs'));
    const list = files.filter(f => f.endsWith('.md'))
      .map(f => f.replace(/\.md$/, ''));
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list docs' });
  }
});

app.get('/docs/:name', async (req, res) => {
  const { name } = req.params;
  const filePath = path.join(__dirname, 'docs-service/docs', `${name}.md`);
  try {
    const text = await fs.readFile(filePath, 'utf-8');
    const html = marked.parse(text);
    res.send(html);
  } catch (err) {
    res.status(404).json({ error: 'Doc not found' });
  }
});

// API tester endpoint
app.post('/test', async (req, res) => {
  const { url, method = 'GET', headers = {}, body } = req.body || {};
  if (!url) {
    return res.status(400).json({ error: 'url is required' });
  }
  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body && method !== 'GET' ? body : undefined
    });
    const text = await response.text();
    res.json({
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      body: text
    });
  } catch (err) {
    res.status(500).json({ error: 'Request failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Docs service running on http://localhost:${PORT}`);
});
