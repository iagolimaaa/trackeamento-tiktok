// server.js
const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const Metric = require('./models/metric');
const { getTikTokMetrics } = require('./controllers/scrapingController');

// Conectar ao MongoDB
require('./config/db');

// Configurar o Express
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Rota para exibir as métricas na dashboard
app.get('/', async (req, res) => {
  const metrics = await Metric.find().sort({ date: -1 }).limit(10); // Exibe as 10 últimas métricas
  res.render('index', { metrics });
});

// Agendar o scraping para rodar a cada 1 hora
cron.schedule('0 * * * *', () => {
  getTikTokMetrics().then(() => {
    console.log('Métricas atualizadas');
  });
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
