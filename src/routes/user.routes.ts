import { UserController } from "../controllers/user.controller";
import express from "express";

const router = express.Router();

const userController = new UserController();

router.get("/getCurrentUser", (req, res) => {
  userController.getCurrentUser(req, res);
});

// TODO
// router.get("/refreshToken", (req, res) => {
//   userController.refreshToken(req, res);
// });

router.post("/login", (req, res) => {
  userController.login(req, res);
});

router.post("/addOne", (req, res) => {
  userController.addOne(req, res);
});

router.get("/getOne/:userId", (req, res) => {
  userController.getOne(req, res);
});

router.get("/getAll", (req, res) => {
  userController.getAll(req, res);
});

export const userRoutes = router;
