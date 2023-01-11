import express from "express";
import asyncHandler from "express-async-handler";
import Type from "../Models/TypesModel.js";
import { admin, protect } from "./../Middleware/AuthMiddleware.js";

const typeRoute = express.Router();

// GET ALL PRODUCT
typeRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
  ? {
      $or: [
        {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        },
        {
          category: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        },
      ],
    }
  : {};
    const count = await Type.countDocuments({ ...keyword });
    const types = await Type.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ types, page, pages: Math.ceil(count / pageSize) });
  })
);

// ADMIN GET ALL PRODUCT WITHOUT SEARCH AND PEGINATION
typeRoute.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const types = await Type.find({}).sort({ _id: -1 });
    res.json(types);
  })
);

// GET SINGLE PRODUCT TYPE
typeRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const type = await Type.findById(req.params.id);
    if (type) {
      res.json(type);
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);
typeRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const type = await Type.findById(req.params.id);

    if (type) {
      const alreadyReviewed = type.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already Reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      type.reviews.push(review);
      type.numReviews = type.reviews.length;
      type.rating =
        type.reviews.reduce((acc, item) => item.rating + acc, 0) /
        type.reviews.length;

      await type.save();
      res.status(201).json({ message: "Reviewed Added" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);
 




export default typeRoute;
