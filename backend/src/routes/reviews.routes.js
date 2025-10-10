import express from "express";
import {
  getHostawayReviews,
  getApprovedReviews,
  approveReview,
  getGoogleReviews,
} from "../controllers/reviews.controller.js";

const router = express.Router();

router.get("/hostaway", getHostawayReviews);
router.get("/approved", getApprovedReviews);
router.post("/approve", approveReview);
router.get("/google", getGoogleReviews);

export default router;
