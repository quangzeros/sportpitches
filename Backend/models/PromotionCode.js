const mongoose = require("mongoose");

const promotionCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: String,
    discountType: {
      type: String,
      enum: ["percentage", "fixed_amount"],
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    maxDiscountAmount: {
      type: Number,
      min: 0,
    },
    minBookingAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    usageLimit: {
      type: Number,
      default: 0, // 0 means unlimited
    },
    usageCount: {
      type: Number,
      default: 0,
    },
    userUsageLimit: {
      type: Number,
      default: 1,
    },
    applicablePitches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pitch",
      },
    ],
    applicableCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    excludedDates: [Date],
    daysOfWeek: {
      type: [Number],
      default: [0, 1, 2, 3, 4, 5, 6],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Create indices for efficient queries
promotionCodeSchema.index({ code: 1 });
promotionCodeSchema.index({ startDate: 1, endDate: 1 });
promotionCodeSchema.index({ isActive: 1 });

module.exports = mongoose.model("PromotionCode", promotionCodeSchema);
