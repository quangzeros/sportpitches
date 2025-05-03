const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "booking_new",
        "booking_confirmed",
        "booking_cancelled",
        "payment_received",
        "review_new",
        "admin_message",
        "other",
      ],
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    relatedBooking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    relatedPitch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pitch",
    },
    actionUrl: String,
    icon: String,
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });

module.exports = mongoose.model("Notification", notificationSchema);
