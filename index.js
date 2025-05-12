const express = require('express');
const nedb = require('nedb-promises');
const app = express();
const db = nedb.create('data.jsonl');

app.use(express.static('public'));
app.use(express.json());

// POST /insert - insert document into db
app.post('/insert', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.json({ error: 'Missing text' });

  const doc = await db.insert({ text });
  res.json(doc);
});

// POST /search - return docs that match query
app.post('/search', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.json([]);

  const regex = new RegExp(text, 'i');
  const results = await db.find({ text: regex });
  res.json(results);
});

app.listen(3000, () => console.log('📦 Server running at http://localhost:3000'));
