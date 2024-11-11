// config/db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tiktok_metrics')
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch(err => {
    console.error('Erro de conexão ao MongoDB:', err);
  });
