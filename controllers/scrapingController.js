// controllers/scrapingController.js
const puppeteer = require('puppeteer');
const Metric = require('../models/metric');

async function getTikTokMetrics() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Vai para a página de login (certifique-se de fazer login manualmente)
  await page.goto('https://ads.tiktok.com/i18n/signup');
  console.log("Por favor, faça login manualmente.");

  // Aguarda o login manual
  await page.waitForTimeout(600000); // Espera 10 minutos para login

  // Agora que o login foi feito, vamos para a página de métricas da campanha
  await page.goto('https://ads.tiktok.com/campaigns');
  
  // Aguarda os dados carregarem
  await page.waitForSelector('.campaign-metrics-selector'); // Substitua com o seletor correto das métricas

  // Coleta as métricas
  const metrics = await page.evaluate(() => {
    const impressions = document.querySelector('.impressions-class').innerText;
    const clicks = document.querySelector('.clicks-class').innerText;
    const spend = document.querySelector('.spend-class').innerText;
    return { impressions, clicks, spend };
  });

  console.log('Métricas coletadas:', metrics);

  // Salva no banco de dados
  const newMetric = new Metric({
    impressions: metrics.impressions,
    clicks: metrics.clicks,
    spend: metrics.spend
  });

  await newMetric.save();
  console.log('Métricas salvas no banco de dados!');

  // Fecha o navegador
  await browser.close();
}

module.exports = { getTikTokMetrics };
