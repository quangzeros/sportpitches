const mongoose = require("mongoose");

const pitchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên sân không được để trống"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Mô tả không được để trống"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Loại sân không được để trống"],
    },
    address: {
      street: String,
      ward: String,
      district: String,
      city: {
        type: String,
        required: [true, "Thành phố không được để trống"],
      },
      zipCode: String,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [
      {
        url: String,
        alt: String,
      },
    ],
    mainImage: {
      url: String,
      alt: String,
    },
    price: {
      type: Number,
      required: [true, "Giá thuê sân không được để trống"],
      min: [0, "Giá không được âm"],
    },
    priceByHour: [
      {
        startHour: Number, // 0-23
        endHour: Number, // 0-23
        price: Number,
        dayOfWeek: {
          type: [Number], // 0: Sunday, 1: Monday, ..., 6: Saturday
          default: [0, 1, 2, 3, 4, 5, 6],
        },
      },
    ],
    facilities: [
      {
        name: String,
        icon: String,
      },
    ],
    rules: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
    openTime: {
      type: Number,
      min: 0,
      max: 24,
      default: 6, // 6 AM
    },
    closeTime: {
      type: Number,
      min: 0,
      max: 24,
      default: 22, // 10 PM
    },
    timeSlotDuration: {
      type: Number,
      default: 60, // in minutes
      enum: [30, 60, 90, 120], // 30 mins, 1 hour, 1.5 hours, 2 hours
    },
    maxBookingPerDay: {
      type: Number,
      default: 0, // 0 means no limit
    },
    advanceBookingDays: {
      type: Number,
      default: 30, // Allow booking up to 30 days in advance
    },
    cancellationPolicy: {
      type: String,
      enum: ["flexible", "moderate", "strict"],
      default: "moderate",
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Set indices
pitchSchema.index({ location: "2dsphere" });
pitchSchema.index({ name: "text", description: "text" });

// Virtual for reviews
pitchSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "pitch",
  localField: "_id",
});

// Virtual for sub-pitches (if pitch has sub-divisions like multiple courts)
pitchSchema.virtual("subPitches", {
  ref: "SubPitch",
  foreignField: "parentPitch",
  localField: "_id",
});

module.exports = mongoose.model("Pitch", pitchSchema);
