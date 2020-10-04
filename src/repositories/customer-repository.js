const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.post = async (data) => {
  const customer = new Customer(data);
  await customer.save();
};

exports.get = async () => {
  const res = await Customer.find({});
  return res;
};

exports.authenticate = async (data) => {
  const res = await Customer.findOne({
    email: data.email,
    password: data.password
  });
  return res;
};