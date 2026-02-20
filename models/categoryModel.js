const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ""
    },
    icon: {
        type: String,
        default: "🍽️"
    },
    bgColor: {
        type: String,
        default: "#5b45b0"
    }
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
