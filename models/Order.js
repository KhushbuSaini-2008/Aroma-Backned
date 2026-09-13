const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  name:     String,
  image:    String,
  price:    Number,
  quantity: Number,
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [orderItemSchema],
  shippingAddress: {
    street: String, city: String,
    state: String, pincode: String, country: String,
  },
  paymentMethod:  { type: String, default: "COD" },
  paymentStatus:  { type: String, enum: ["pending","paid","failed"], default: "pending" },
  orderStatus:    { type: String, enum: ["processing","shipped","delivered","cancelled"], default: "processing" },
  itemsPrice:     { type: Number, default: 0 },
  shippingPrice:  { type: Number, default: 0 },
  totalPrice:     { type: Number, default: 0 },
  deliveredAt:    Date,
  paidAt:         Date,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
