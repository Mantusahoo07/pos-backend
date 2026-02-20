const Category = require("../models/categoryModel");
const createHttpError = require("http-errors");

// Get all categories
const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ 
            success: true, 
            data: categories 
        });
    } catch (error) {
        next(error);
    }
};

// Get category count
const getCategoryCount = async (req, res, next) => {
    try {
        const count = await Category.countDocuments();
        res.status(200).json({ 
            success: true, 
            data: { count } 
        });
    } catch (error) {
        next(error);
    }
};

// Add new category
const addCategory = async (req, res, next) => {
    try {
        const { name, description, icon, bgColor } = req.body;
        
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            const error = createHttpError(400, "Category already exists!");
            return next(error);
        }

        const category = new Category({
            name,
            description,
            icon,
            bgColor
        });

        await category.save();
        res.status(201).json({
            success: true,
            message: "Category added successfully!",
            data: category
        });
    } catch (error) {
        next(error);
    }
};

// Update category
const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const category = await Category.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        );

        if (!category) {
            const error = createHttpError(404, "Category not found!");
            return next(error);
        }

        res.status(200).json({
            success: true,
            message: "Category updated successfully!",
            data: category
        });
    } catch (error) {
        next(error);
    }
};

// Delete category
const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Check if category has menu items
        const MenuItem = require("../models/menuItemModel");
        const hasItems = await MenuItem.findOne({ category: id });
        
        if (hasItems) {
            const error = createHttpError(400, "Cannot delete category with menu items!");
            return next(error);
        }

        const category = await Category.findByIdAndDelete(id);
        
        if (!category) {
            const error = createHttpError(404, "Category not found!");
            return next(error);
        }

        res.status(200).json({
            success: true,
            message: "Category deleted successfully!"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCategories,
    getCategoryCount,
    addCategory,
    updateCategory,
    deleteCategory
};
