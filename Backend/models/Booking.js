const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pitch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pitch",
      required: true,
    },
    subPitch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubPitch",
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    // Chỉ có thanh toán tiền mặt
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    customerNotes: String,
    adminNotes: String,
    contactPhone: {
      type: String,
      required: true,
    },
    cancellationReason: String,
    cancelledBy: {
      type: String,
      enum: ["user", "owner", "admin"],
    },
    cancelledAt: Date,
    promotionCode: {
      type: String,
      default: null,
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create index for efficient queries
bookingSchema.index({ pitch: 1, startTime: 1, endTime: 1 });
bookingSchema.index({ user: 1, status: 1 });

// Virtual duration in hours
bookingSchema.virtual("durationHours").get(function () {
  return (this.endTime - this.startTime) / (1000 * 60 * 60);
});

module.exports = mongoose.model("Booking", bookingSchema);
