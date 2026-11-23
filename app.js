const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from DevOps v2!',
    status: 'Application running',
    version: '2.0.0'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

if (require.main === module) {
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Application listening on port ${PORT}`);
});
} 
module.exports = app;
