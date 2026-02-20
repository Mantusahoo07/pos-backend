const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerDetails: {
        name: { 
            type: String, 
            required: true,
            default: "Guest" 
        },
        phone: { 
            type: String, 
            required: false  // Made optional
        },
        guests: { 
            type: Number, 
            required: true,
            min: 1,
            default: 1
        },
    },
    orderStatus: {
        type: String,
        required: true,
        enum: ["In Progress", "Ready", "Completed", "Cancelled"],
        default: "In Progress"
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    bills: {
        total: { type: Number, required: true },
        tax: { type: Number, required: true },
        totalWithTax: { type: Number, required: true }
    },
    items: [{
        name: String,
        quantity: Number,
        price: Number,
        notes: String
    }],
    table: { type: mongoose.Schema.Types.ObjectId, ref: "Table", required: true },
    paymentMethod: {
        type: String,
        enum: ["Cash", "Online", "Card", "UPI", ""],
        default: ""
    },
    paymentData: {
        razorpay_order_id: String,
        razorpay_payment_id: String,
        razorpay_signature: String
    },
    specialInstructions: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
