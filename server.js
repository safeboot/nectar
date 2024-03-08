import fs from 'node:fs/promises'
import express from 'express'

import Database from 'better-sqlite3';
const db = new Database('nectar.db', { verbose: console.log });
db.pragma('journal_mode = WAL');

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 1753
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

app.use('/api/apps', (req, res) => {
  const stmt = db.prepare('SELECT apps.name, apps.icon, apps.url, apps.server_id, servers.name as server_name FROM apps INNER JOIN servers ON apps.server_id = servers.id');
  res.json(stmt.all());
});

app.use('/api/servers', (req, res) => {
  const stmt = db.prepare('SELECT * FROM servers');
  res.json(stmt.all());
});

app.use('/api/bookmarks', (req, res) => {
  const stmt = db.prepare('SELECT bookmarks.name, bookmarks.url, bookmarks.icon, bookmarks.category_id, bookmark_categories.name as category_name FROM bookmarks INNER JOIN bookmark_categories ON bookmarks.category_id = bookmark_categories.id');
  res.json(stmt.all());
});

app.use('/api/bookmark_categories', (req, res) => {
  const stmt = db.prepare('SELECT * FROM bookmark_categories');
  res.json(stmt.all());
});

app.use('/api/settings', (req, res) => {
  const stmt = db.prepare('SELECT * FROM settings');
  res.json(stmt.all());
});

// Serve static files
app.use('/public', express.static('public'))

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