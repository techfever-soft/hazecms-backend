import { PostCategoryController } from "../controllers/post_category.controller";
import express from "express";

const router = express.Router();

const postsCategoriesController = new PostCategoryController();

router.post("/createOne", (req, res) => {
  postsCategoriesController.createOne(req, res);
});

router.get("/getAll", (req, res) => {
  postsCategoriesController.getAll(req, res);
});

router.delete("/deleteOne/:categoryId", (req, res) => {
  postsCategoriesController.deleteOne(req, res);
});

export const postsCategoriesRoutes = router;
