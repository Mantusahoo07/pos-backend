const MenuItem = require("../models/menuItemModel");
const createHttpError = require("http-errors");

// Get all menu items
const getMenuItems = async (req, res, next) => {
    try {
        const menuItems = await MenuItem.find().populate("category");
        res.status(200).json({ 
            success: true, 
            data: menuItems 
        });
    } catch (error) {
        next(error);
    }
};

// Get menu items by category
const getMenuItemsByCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const menuItems = await MenuItem.find({ category: categoryId });
        res.status(200).json({ 
            success: true, 
            data: menuItems 
        });
    } catch (error) {
        next(error);
    }
};

// Get menu item count
const getMenuItemCount = async (req, res, next) => {
    try {
        const count = await MenuItem.countDocuments();
        res.status(200).json({ 
            success: true, 
            data: { count } 
        });
    } catch (error) {
        next(error);
    }
};

// Add new menu item
const addMenuItem = async (req, res, next) => {
    try {
        const { name, price, category, description, preparationTime } = req.body;

        const menuItem = new MenuItem({
            name,
            price,
            category,
            description,
            preparationTime
        });

        await menuItem.save();
        
        // Populate category for response
        await menuItem.populate("category");

        res.status(201).json({
            success: true,
            message: "Menu item added successfully!",
            data: menuItem
        });
    } catch (error) {
        next(error);
    }
};

// Update menu item
const updateMenuItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const menuItem = await MenuItem.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        ).populate("category");

        if (!menuItem) {
            const error = createHttpError(404, "Menu item not found!");
            return next(error);
        }

        res.status(200).json({
            success: true,
            message: "Menu item updated successfully!",
            data: menuItem
        });
    } catch (error) {
        next(error);
    }
};

// Delete menu item
const deleteMenuItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const menuItem = await MenuItem.findByIdAndDelete(id);
        
        if (!menuItem) {
            const error = createHttpError(404, "Menu item not found!");
            return next(error);
        }

        res.status(200).json({
            success: true,
            message: "Menu item deleted successfully!"
        });
    } catch (error) {
        next(error);
    }
};

// Toggle availability
const toggleAvailability = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const menuItem = await MenuItem.findById(id);
        
        if (!menuItem) {
            const error = createHttpError(404, "Menu item not found!");
            return next(error);
        }

        menuItem.isAvailable = !menuItem.isAvailable;
        await menuItem.save();

        res.status(200).json({
            success: true,
            message: `Menu item ${menuItem.isAvailable ? 'available' : 'unavailable'} now!`,
            data: menuItem
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getMenuItems,
    getMenuItemsByCategory,
    getMenuItemCount,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleAvailability
};
