const Content = require("../models/Content");

const listByType = async (req, res) => {
  const { type } = req.params;
  const items = await Content.find({ type, isPublished: true }).sort({ createdAt: -1 });
  res.json(items);
};

const adminListByType = async (req, res) => {
  const { type } = req.params;
  const items = await Content.find({ type }).sort({ createdAt: -1 });
  res.json(items);
};

const createByType = async (req, res) => {
  const { type } = req.params;
  const payload = { ...req.body, type };
  if (req.file) payload.image = `/uploads/${req.file.filename}`;
  const item = await Content.create(payload);
  res.status(201).json(item);
};

const updateById = async (req, res) => {
  const payload = { ...req.body };
  if (req.file) payload.image = `/uploads/${req.file.filename}`;
  const item = await Content.findByIdAndUpdate(req.params.id, payload, { new: true });
  if (!item) return res.status(404).json({ message: "Item not found" });
  return res.json(item);
};

const removeById = async (req, res) => {
  const item = await Content.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  return res.json({ message: "Deleted successfully" });
};

const submitContact = async (req, res) => {
  const item = await Content.create({ ...req.body, type: "contact", isPublished: false });
  res.status(201).json(item);
};

module.exports = {
  listByType,
  adminListByType,
  createByType,
  updateById,
  removeById,
  submitContact,
};
