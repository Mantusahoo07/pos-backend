const express = require("express");
const router = express.Router();
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const {
    getCategories,
    getCategoryCount,
    addCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

// Public routes (if needed)
router.route("/").get(getCategories);
router.route("/count").get(getCategoryCount);

// Protected routes (require authentication)
router.route("/").post(isVerifiedUser, addCategory);
router.route("/:id").put(isVerifiedUser, updateCategory);
router.route("/:id").delete(isVerifiedUser, deleteCategory);

module.exports = router;
