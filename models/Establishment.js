const mongoose = require("mongoose");

const Establishment = mongoose.model("Establishment", {
  name: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: true
  },
  address: {
    type: String,
    minlength: 1,
    maxlength: 150,
    required: true
  },
  location: {
    lng: Number,
    lat: Number
  },
  phone: {
    type: String,
    min: 0,
    max: 13
  },
  thumbnail: {
    type: String
  },
  type: {
    type: String
  },
  category: {
    type: Number,
    min: 0,
    max: 2
  },
  rating: {
    type: Number,
    min: 0,
    max: 1
  },
  description: {
    type: String,
    maxlength: 500
  },

  pictures: [String],

  nearbyPlacesIds: [Number],
  created: {
    type: Date,
    default: Date.now
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = Establishment;
