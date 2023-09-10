import { adminRoutes } from "./src/routes/admin.routes";
import { mySQLInstallRoutes } from "./src/routes/databases/mysql_install.routes";
import { postsCategoriesRoutes } from "./src/routes/posts_categories.routes";
import { postsRoutes } from "./src/routes/posts.routes";

import express from "express";

const router = express.Router();

router.use("/api/v1/admin/", adminRoutes);

router.use("/api/v1/posts/", postsRoutes);

router.use("/api/v1/posts_categories/", postsCategoriesRoutes);

/**
 * Install routes
 * NOTE: You can remove this route after your installed the CMS
 */

router.use("/api/v1/install/mysql/", mySQLInstallRoutes);

export const routes = router;
