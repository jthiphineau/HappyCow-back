const express = require("express");
// const cloudinary = require("cloudinary");
const router = express.Router();
const Establishment = require("../models/Establishment.js");
const isAuthenticated = require("../middlewares/isAuthenticated");
const formidableMiddleware = require("express-formidable");
router.use(formidableMiddleware());

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

router.post("/establishment/publish", isAuthenticated, async (req, res) => {
  try {
    if (Object.keys(req.files) > 0) {
      cloudinary.v2.uploader.upload(
        req.files.file.path,
        async (error, result) => {
          if (error) {
            return res.json({ error: error.message });
          } else {
            const obj = {
              name: req.fields.name,
              address: req.fields.address,
              location: req.fields.location,
              phone: req.fields.phone,
              thumbnail: req.fields.thumbnail,
              type: req.fields.type,
              category: req.fields.category,
              rating: req.fields.rating,
              description: req.fields.description,
              picture: result,
              nearbyPlacesIds: req.fields.nearbyPlacesIds,
              creator: req.user
            };
            const establishment = new Establishment(obj);
            await establishment.save();

            res.json({
              placeId: establishment.placeId,
              name: establishment.name,
              address: establishment.address,
              location: establishment.location,
              phone: establishment.phone,
              thumbnail: establishment.thumbnail,
              type: establishment.type,
              category: establishment.category,
              rating: establishment.rating,
              description: establishment.description,
              picture: establishment.picture,
              nearbyPlacesIds: establishment.nearbyPlacesIds,
              created: establishment.created,
              creator: {
                account: establishment.creator.account,
                _id: establishment.creator._id
              }
            });
          }
        }
      );
    } else {
      // console.log(req.user);
      const obj = {
        name: req.fields.name,
        description: req.fields.description,
        creator: req.user,
        address: req.fields.address
      };
      const establishment = new Establishment(obj);
      await establishment.save();

      res.json({
        placeId: establishment.placeId,
        name: establishment.name,
        address: establishment.address,
        location: establishment.location,
        phone: establishment.phone,
        thumbnail: establishment.thumbnail,
        type: establishment.type,
        category: establishment.category,
        rating: establishment.rating,
        description: establishment.description,
        picture: establishment.picture,
        nearbyPlacesIds: establishment.nearbyPlacesIds,
        created: establishment.created,
        creator: {
          account: establishment.creator.account,
          _id: establishment.creator._id
        }
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
