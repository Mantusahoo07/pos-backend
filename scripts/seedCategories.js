const mongoose = require("mongoose");
const Category = require("../models/categoryModel");
const config = require("../config/config");

const categories = [
    { name: "Starters", icon: "🍲", bgColor: "#b73e3e" },
    { name: "Main Course", icon: "🍛", bgColor: "#5b45b0" },
    { name: "Beverages", icon: "🍹", bgColor: "#7f167f" },
    { name: "Soups", icon: "🍜", bgColor: "#735f32" },
    { name: "Desserts", icon: "🍰", bgColor: "#1d2569" },
    { name: "Pizzas", icon: "🍕", bgColor: "#285430" },
    { name: "Alcoholic Drinks", icon: "🍺", bgColor: "#b73e3e" },
    { name: "Salads", icon: "🥗", bgColor: "#5b45b0" }
];

const seedCategories = async () => {
    try {
        await mongoose.connect(config.databaseURI);
        console.log("Connected to MongoDB");

        await Category.deleteMany({});
        console.log("Cleared existing categories");

        await Category.insertMany(categories);
        console.log("Added initial categories");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding categories:", error);
        process.exit(1);
    }
};

seedCategories();
