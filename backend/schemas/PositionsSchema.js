const { Schema } = require('mongoose');


const PositionsSchema = new Schema({
  product: { type: String, required: true },
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  avg: { type: Number, required: true },
  price: { type: Number, required: true },
  net: { type: Number, required: true },
  day: { type: Number, required: true },
  isLoss: { type: Boolean, required: true }
});

// Export the schema
module.exports = { PositionsSchema };
