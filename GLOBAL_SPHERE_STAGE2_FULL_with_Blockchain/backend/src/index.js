
require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { ethers } = require('ethers');
const app = express();
app.use(express.json());
const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_SERVICE_KEY || '');

// sample endpoint to register product batch on-chain (calls ProductTraceability)
app.post('/api/blockchain/register-batch', async (req,res) => {
  const { sku, origin, metadataURI } = req.body;
  // In production: use ethers provider and contract ABI/address (from deployment)
  // Here we return a simulated response
  return res.json({ success: true, chainBatchId: Math.floor(Math.random()*1000000) });
});

app.get('/api/health', (req,res)=> res.json({ok:true}));
app.listen(process.env.PORT||4000, ()=> console.log('Stage2 backend running'));
