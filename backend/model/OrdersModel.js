const { model } = require("mongoose");
const { OrdersSchema } = require("../schemas/OrdersSchema");

// Exporting the model directly without using 'new'
const OrdersModel = model("order", OrdersSchema);

module.exports = { OrdersModel };
