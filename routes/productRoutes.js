const express = require("express");
const router  = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, addReview, getFeatured } = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/",           getProducts);
router.get("/featured",   getFeatured);
router.get("/:id",        getProductById);
router.post("/",          protect, adminOnly, createProduct);
router.put("/:id",        protect, adminOnly, updateProduct);
router.delete("/:id",     protect, adminOnly, deleteProduct);
router.post("/:id/review",protect, addReview);

module.exports = router;
