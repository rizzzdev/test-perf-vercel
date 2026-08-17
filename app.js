const express = require('express');
const { cpuIntensiveField } = require('./cpu-work');

const app = express();

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    cpu_intensive: cpuIntensiveField(),
    timestamp: new Date().toISOString()
  });
});

module.exports = app;