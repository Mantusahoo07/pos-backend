const express = require("express");
const router = express.Router();
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const {
    getMenuItems,
    getMenuItemsByCategory,
    getMenuItemCount,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleAvailability
} = require("../controllers/menuItemController");

router.route("/").get(getMenuItems);
router.route("/count").get(getMenuItemCount);
router.route("/category/:categoryId").get(getMenuItemsByCategory);
router.route("/").post(isVerifiedUser, addMenuItem);
router.route("/:id").put(isVerifiedUser, updateMenuItem);
router.route("/:id").delete(isVerifiedUser, deleteMenuItem);
router.route("/:id/toggle").patch(isVerifiedUser, toggleAvailability);

module.exports = router;
