const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["package", "visa", "desk", "cms", "gallery", "testimonial", "contact"],
    },
    title: { type: String, required: true },
    slug: { type: String, index: true },
    description: { type: String, default: "" },
    body: { type: String, default: "" },
    image: { type: String, default: "" },
    rating: { type: Number, min: 1, max: 5 },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    isPublished: { type: Boolean, default: true },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", contentSchema);
