const createHttpError = require("http-errors");
const Order = require("../models/orderModel");
const mongoose = require("mongoose");

const addOrder = async (req, res, next) => {
  try {
    // Set default values for optional fields
    const orderData = {
      ...req.body,
      customerDetails: {
        name: req.body.customerDetails?.name || `Guest ${Math.floor(Math.random() * 1000)}`,
        phone: req.body.customerDetails?.phone || "",
        guests: req.body.customerDetails?.guests || 1
      }
    };

    const order = new Order(orderData);
    await order.save();
    
    res.status(201).json({ 
      success: true, 
      message: "Order created!", 
      data: order 
    });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = createHttpError(404, "Invalid id!");
      return next(error);
    }

    const order = await Order.findById(id).populate("table");
    if (!order) {
      const error = createHttpError(404, "Order not found!");
      return next(error);
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("table")
      .sort({ createdAt: -1 }); // Most recent first
    res.status(200).json({ data: orders });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = createHttpError(404, "Invalid id!");
      return next(error);
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    ).populate("table");

    if (!order) {
      const error = createHttpError(404, "Order not found!");
      return next(error);
    }

    res.status(200).json({ 
      success: true, 
      message: "Order updated", 
      data: order 
    });
  } catch (error) {
    next(error);
  }
};

const getOrdersByStatus = async (req, res, next) => {
  try {
    const { status } = req.params;
    const orders = await Order.find({ orderStatus: status })
      .populate("table")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

const getTodaysOrders = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const orders = await Order.find({
      createdAt: { $gte: today }
    }).populate("table").sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

module.exports = { 
  addOrder, 
  getOrderById, 
  getOrders, 
  updateOrder,
  getOrdersByStatus,
  getTodaysOrders 
};
