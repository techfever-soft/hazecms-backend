import { PostsController } from "../controllers/posts.controller";
import express from "express";

const router = express.Router();

const postsController = new PostsController();

router.post("/createOne", (req, res) => {
  postsController.createOne(req, res);
});

router.post("/updateOne/:postId", (req, res) => {
  postsController.updateOne(req, res);
});

router.delete("/deleteOne/:postId", (req, res) => {
  postsController.deleteOne(req, res);
});

router.get("/getOne/:postId", (req, res) => {
  postsController.getOne(req, res);
});

router.get("/getOneBySlug", (req, res) => {
  postsController.getOneBySlug(req, res);
});

router.get("/getAll", (req, res) => {
  postsController.getAll(req, res);
});

export const postsRoutes = router;
