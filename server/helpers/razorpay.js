const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "rzp_test_iQY8NeIVqbtUDO", // Replace with your Razorpay Key ID
  key_secret: "RdTIrqR8dKyKG32YNYcc7xJX", // Replace with your Razorpay Key Secret
});

module.exports = razorpay;
