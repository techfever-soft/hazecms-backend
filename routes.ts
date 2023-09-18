import { adminRoutes } from "./src/routes/admin.routes";
import express from "express";
import { mySQLInstallRoutes } from "./src/routes/databases/mysql/install.routes";
import { pagesRoutes } from "./src/routes/pages.routes";
import { postsCategoriesRoutes } from "./src/routes/posts_categories.routes";
import { postsRoutes } from "./src/routes/posts.routes";

const router = express.Router();

router.use("/api/v1/admin/", adminRoutes);

router.use("/api/v1/posts/", postsRoutes);

router.use("/api/v1/pages/", pagesRoutes);

router.use("/api/v1/posts_categories/", postsCategoriesRoutes);

/**
 * Install routes
 * NOTE: You can remove this route after your installed the CMS
 */

router.use("/api/v1/install/mysql/", mySQLInstallRoutes);

export const routes = router;
