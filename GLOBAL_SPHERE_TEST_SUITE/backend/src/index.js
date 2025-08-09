
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

// simple products endpoint
const sampleProducts = require('./data/sample_products.json');
app.get('/api/products', (req,res) => {
  res.json({ total: sampleProducts.length, page:1, limit:20, products: sampleProducts });
});

app.get('/api/products/:id', (req,res) => {
  const p = sampleProducts.find(x => x.id === Number(req.params.id));
  if(!p) return res.status(404).json({ error: 'not_found' });
  res.json(p);
});

if(require.main === module){
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, ()=> console.log('Server running on', PORT));
} else {
  module.exports = app;
}
