const mongoose = require("mongoose");

const subPitchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    parentPitch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pitch",
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    priceByHour: [
      {
        startHour: Number,
        endHour: Number,
        price: Number,
        dayOfWeek: {
          type: [Number],
          default: [0, 1, 2, 3, 4, 5, 6],
        },
      },
    ],
    images: [
      {
        url: String,
        alt: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for bookings of this sub-pitch
subPitchSchema.virtual("bookings", {
  ref: "Booking",
  foreignField: "subPitch",
  localField: "_id",
});

module.exports = mongoose.model("SubPitch", subPitchSchema);
