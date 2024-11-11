// models/metric.js
const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema({
  impressions: Number,
  clicks: Number,
  spend: Number,
  date: { type: Date, default: Date.now }
});

const Metric = mongoose.model('Metric', metricSchema);

module.exports = Metric;
