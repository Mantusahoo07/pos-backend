const express = require("express");
const { 
  addOrder, 
  getOrders, 
  getOrderById, 
  updateOrder,
  getOrdersByStatus,
  getTodaysOrders 
} = require("../controllers/orderController");
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const router = express.Router();

// Protected routes
router.route("/").post(isVerifiedUser, addOrder);
router.route("/").get(isVerifiedUser, getOrders);
router.route("/today").get(isVerifiedUser, getTodaysOrders);
router.route("/status/:status").get(isVerifiedUser, getOrdersByStatus);
router.route("/:id").get(isVerifiedUser, getOrderById);
router.route("/:id").put(isVerifiedUser, updateOrder);

module.exports = router;
