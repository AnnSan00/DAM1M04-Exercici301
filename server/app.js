const express = require('express');
const fs = require('fs');
const path = require('path');
const hbs = require('hbs');

const app = express();
const port = 3000;

// Static files (optional)
app.use(express.static(path.join(__dirname, 'public')));

// Disable cache
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

// Continguts estàtics (carpeta public)
app.use(express.static('public'))

// Handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Registrar "Helpers .hbs" aquí
hbs.registerHelper('gt', (a, b) => a > b);

// Route
app.get('/animals', (req, res) => { // A la ruta URL /animals

  const file = path.join(__dirname, 'data', 'animals.json'); // Llegim el fitxer JSON
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  res.render('animals', json);                              // renderitza la plantilla animals.hbs
});

// Start server
const httpServer = app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log(`http://localhost:${port}/animals`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  httpServer.close();
  process.exit(0);
});
