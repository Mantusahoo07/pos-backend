const express = require("express");
const router = express.Router();
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const { 
  createOrder, 
  verifyPayment, 
  webHookVerification,
  getPayments,
  getPaymentById,
  getPaymentStats
} = require("../controllers/paymentController");

// Public webhook (no auth required)
router.route("/webhook-verification").post(webHookVerification);

// Protected routes (require authentication)
router.route("/create-order").post(isVerifiedUser, createOrder);
router.route("/verify-payment").post(isVerifiedUser, verifyPayment);

// ✅ NEW: Get all payments and stats
router.route("/").get(isVerifiedUser, getPayments);
router.route("/stats").get(isVerifiedUser, getPaymentStats);
router.route("/:id").get(isVerifiedUser, getPaymentById);

module.exports = router;
