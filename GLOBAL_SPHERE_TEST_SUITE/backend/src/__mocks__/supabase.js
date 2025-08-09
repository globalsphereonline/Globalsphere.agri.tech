
const sampleProducts = require('../data/sample_products.json');
module.exports = {
  createClient: () => ({
    from: (table) => ({
      select: () => ({ data: sampleProducts, error: null, count: sampleProducts.length }),
      range: (from, to) => ({ data: sampleProducts.slice(from,to+1), error: null, count: sampleProducts.length }),
      eq: () => ({ select: () => ({ data: [], error: null }) }),
      single: async () => ({ data: sampleProducts[0], error: null })
    })
  })
};
