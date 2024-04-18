import fs from 'node:fs/promises'
import express from 'express'

import Database from 'better-sqlite3';
const db = new Database('nectar.db', { verbose: console.log });
db.pragma('journal_mode = WAL');

import bodyParser from 'body-parser';

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''
const ssrManifest = isProduction
  ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
  : undefined

// Create http server
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));

// Add Vite or respective production middlewares
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

app.get('/api/apps', (req, res) => {
  const stmt = db.prepare('SELECT apps.id, apps.name, apps.icon, apps.url, apps.server_id, servers.name as server_name FROM apps INNER JOIN servers ON apps.server_id = servers.id');
  res.json(stmt.all());
});

app.post('/api/apps', (req, res) => {
  const data = req.body;
  if (data.id) {
    const stmt = db.prepare('UPDATE apps SET name = ?, icon = ?, url = ?, server_id = ? WHERE id = ?');
    stmt.run(data.name, data.icon, data.url, data.server_id, data.id);
  } else {
    const stmt = db.prepare('INSERT INTO apps (name, icon, url, server_id) VALUES (?, ?, ?, ?)');
    stmt.run(data.name, data.icon, data.url, data.server_id);
  }

  res.json({ success: true });
});

app.delete('/api/apps/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM apps WHERE id = ?');
  stmt.run(req.params.id);
  res.json({ success: true });
});

app.get('/api/servers', (req, res) => {
  const stmt = db.prepare('SELECT * FROM servers');
  res.json(stmt.all());
});

app.post('/api/servers', (req, res) => {
  const data = req.body;
  if (data.id) {
    const stmt = db.prepare('UPDATE servers SET name = ?, host = ?, port = ? WHERE id = ?');
    stmt.run(data.name, data.host, data.port == 'null' ? null : Number(data.port), data.id);
  } else {
    const stmt = db.prepare('INSERT INTO servers (name, host, port) VALUES (?, ?, ?)');
    stmt.run(data.name, data.host, data.port == 'null' ? null : Number(data.port));
  }

  res.json({ success: true });
});

app.delete('/api/servers/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM servers WHERE id = ?');
  stmt.run(req.params.id);
  res.json({ success: true });
});

app.get('/api/bookmarks', (req, res) => {
  const stmt = db.prepare('SELECT bookmarks.id, bookmarks.name, bookmarks.url, bookmarks.icon, bookmarks.category_id, bookmark_categories.name as category_name FROM bookmarks INNER JOIN bookmark_categories ON bookmarks.category_id = bookmark_categories.id');
  res.json(stmt.all());
});

app.post('/api/bookmarks', (req, res) => {
  const data = req.body;
  if (data.icon == 'null' || data.icon == '') {
    data.icon = null;
  }
  
  if (data.id) {
    const stmt = db.prepare('UPDATE bookmarks SET name = ?, url = ?, icon = ?, category_id = ? WHERE id = ?');
    stmt.run(data.name, data.url, data.icon, data.category_id, data.id);
  } else {
    const stmt = db.prepare('INSERT INTO bookmarks (name, url, icon, category_id) VALUES (?, ?, ?, ?)');
    stmt.run(data.name, data.url, data.icon, data.category_id);
  }

  res.json({ success: true });
});

app.delete('/api/bookmarks/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM bookmarks WHERE id = ?');
  stmt.run(req.params.id);
  res.json({ success: true });
});

app.get('/api/bookmark_categories', (req, res) => {
  const stmt = db.prepare('SELECT * FROM bookmark_categories');
  res.json(stmt.all());
});

app.post('/api/bookmark_categories', (req, res) => {
  const data = req.body;
  if (data.id) {
    const stmt = db.prepare('UPDATE bookmark_categories SET name = ? WHERE id = ?');
    stmt.run(data.name, data.id);
  } else {
    const stmt = db.prepare('INSERT INTO bookmark_categories (name) VALUES (?)');
    stmt.run(data.name);
  }

  res.json({ success: true });
});

app.delete('/api/bookmark_categories/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM bookmark_categories WHERE id = ?');
  stmt.run(req.params.id);
  res.json({ success: true });
});

// Serve HTML
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.js')).render
    } else {
      template = templateHtml
      render = (await import('./dist/server/entry-server.js')).render
    }

    const rendered = await render(url, ssrManifest)

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})