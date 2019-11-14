import { Router } from "express";
import PostController from "../../controllers/PostController";
import { checkJwt } from "../../middleware/checkJwt";
import { checkRole } from "../../middleware/checkRole";

const router = Router();

//Get all users
router.get("/", [checkJwt, checkRole(["ADMIN"])], PostController.listAll);

// Get one user
router.get("/:id", [checkJwt, checkRole(["ADMIN"])], PostController.getOneById);

//Create a new user
router.post("/", [checkJwt, checkRole(["ADMIN"])], PostController.newPost);

//Edit one user
router.patch("/:id", [checkJwt, checkRole(["ADMIN"])], PostController.editPost);

//Delete one user
router.delete(
  "/:id",
  [checkJwt, checkRole(["ADMIN"])],
  PostController.deletePost
);

export default router;
