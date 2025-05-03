const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
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
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        url: String,
        alt: String,
      },
    ],
    isApproved: {
      type: Boolean,
      default: true,
    },
    ownerReply: {
      text: String,
      createdAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index to ensure a user can only review once per booking
reviewSchema.index({ booking: 1, user: 1 }, { unique: true });

// Static method to calculate average rating
reviewSchema.statics.calcAverageRating = async function (pitchId) {
  const stats = await this.aggregate([
    {
      $match: { pitch: pitchId, isApproved: true },
    },
    {
      $group: {
        _id: "$pitch",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await mongoose.model("Pitch").findByIdAndUpdate(pitchId, {
      averageRating: Math.round(stats[0].avgRating * 10) / 10, // Round to 1 decimal
      reviewCount: stats[0].nRating,
    });
  } else {
    // If no reviews
    await mongoose.model("Pitch").findByIdAndUpdate(pitchId, {
      averageRating: 0,
      reviewCount: 0,
    });
  }
};

// Call calcAverageRating after save
reviewSchema.post("save", function () {
  this.constructor.calcAverageRating(this.pitch);
});

// Call calcAverageRating before remove
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne().clone();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  if (this.r) await this.r.constructor.calcAverageRating(this.r.pitch);
});

module.exports = mongoose.model("Review", reviewSchema);
