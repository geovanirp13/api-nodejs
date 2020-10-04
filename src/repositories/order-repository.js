const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.post = async (data) => {
  const order = new Order(data);
  await order.save();
};

exports.get = async () => {
  const res = await Order
  .find({}, 'number status customer items')
  .populate('customer', 'name')
  .populate('items.product', 'title');
  return res;
};