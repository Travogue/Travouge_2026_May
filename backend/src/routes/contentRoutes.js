const express = require("express");
const upload = require("../config/upload");
const { protect, adminOnly } = require("../middlewares/auth");
const {
  listByType,
  adminListByType,
  createByType,
  updateById,
  removeById,
  submitContact,
} = require("../controllers/contentController");

const router = express.Router();

router.get("/:type", listByType);
router.post("/contact", submitContact);
router.get("/admin/:type", protect, adminOnly, adminListByType);
router.post("/admin/:type", protect, adminOnly, upload.single("image"), createByType);
router.put("/admin/:id", protect, adminOnly, upload.single("image"), updateById);
router.delete("/admin/:id", protect, adminOnly, removeById);

module.exports = router;
