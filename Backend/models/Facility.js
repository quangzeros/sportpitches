const mongoose = require("mongoose");

const facilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: String,
    icon: {
      type: String,
      default: "default-icon",
    },
    category: {
      type: String,
      enum: [
        "amenities",
        "equipment",
        "safety",
        "accessibility",
        "services",
        "other",
      ],
      default: "amenities",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Facility", facilitySchema);
