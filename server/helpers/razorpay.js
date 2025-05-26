const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_5xLgYK7t7oZ6oM",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "RdTIrqR8dKyKG32YNYcc7xJX",
});

module.exports = razorpay;
