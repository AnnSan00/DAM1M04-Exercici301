const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();
const PORT = 3000;

// Paths
const viewsPath = path.join(__dirname, "views");
const partialsPath = path.join(__dirname, "views/partials");
const publicPath = path.join(__dirname, "../public");

// Configuració HBS
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Helper lte (<=)
hbs.registerHelper("lte", function (a, b) {
  return a <= b;
});

// Middleware per servir arxius estàtics
app.use(express.static(publicPath));

// Carregar dades JSON
const site = require("./data/site.json");
const cities = require("./data/cities.json");
const countries = require("./data/countries.json");

// RUTA PRINCIPAL
app.get("/", (req, res) => {
  res.render("index", {
    ...site
  });
});

// RUTA INFORME
app.get("/informe", (req, res) => {
  res.render("informe", {
    title: site.title,
    cities: cities.cities,
    countries: countries.countries,
    threshold: 800000
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor en marxa a http://localhost:3000/`);
});
