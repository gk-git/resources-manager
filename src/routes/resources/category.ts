import { Router } from "express";
import CategoryController from "../../controllers/CategoryController";
import { checkJwt } from "../../middleware/checkJwt";
import { checkRole } from "../../middleware/checkRole";

const router = Router();

//Get all users
router.get("/", [checkJwt, checkRole(["ADMIN"])], CategoryController.listAll);

// Get one user
router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  CategoryController.getOneById
);

//Create a new user
router.post(
  "/",
  [checkJwt, checkRole(["ADMIN"])],
  CategoryController.newCategory
);

//Edit one user
router.patch(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  CategoryController.editCategory
);

//Delete one user
router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  CategoryController.deleteCategory
);

export default router;
