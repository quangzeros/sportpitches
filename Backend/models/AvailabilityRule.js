const mongoose = require("mongoose");

const availabilityRuleSchema = new mongoose.Schema(
  {
    pitch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pitch",
      required: true,
    },
    subPitch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubPitch",
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    daysOfWeek: {
      type: [Number], // 0: Sunday, 1: Monday, ..., 6: Saturday
      default: [0, 1, 2, 3, 4, 5, 6],
    },
    startTime: {
      type: Number, // Hours in 24-hour format (0-23)
      required: true,
      min: 0,
      max: 23,
    },
    endTime: {
      type: Number, // Hours in 24-hour format (0-23)
      required: true,
      min: 0,
      max: 24,
    },
    isAvailable: {
      type: Boolean,
      default: true, // true: available in this time range, false: unavailable
    },
    priority: {
      type: Number,
      default: 1, // Higher priority rules override lower priority ones
    },
    specialPrice: {
      type: Number,
      min: 0,
    },
    reason: String, // E.g. "Maintenance", "Holiday", "Special Event"
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
availabilityRuleSchema.index({ pitch: 1, startDate: 1, endDate: 1 });
availabilityRuleSchema.index({ subPitch: 1, startDate: 1, endDate: 1 });

module.exports = mongoose.model("AvailabilityRule", availabilityRuleSchema);
