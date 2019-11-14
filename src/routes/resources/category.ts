import { Router } from "express";
import CategoryController from "../../controllers/CategoryController";
import { checkJwt } from "../../middleware/checkJwt";
import { checkRole } from "../../middleware/checkRole";

const router = Router();

//Get all categories
router.get("/", [checkJwt, checkRole(["ADMIN"])], CategoryController.listAll);

// Get one category
router.get(
  "/:id",
  [checkJwt, checkRole(["ADMIN"])],
  CategoryController.getOneById
);

//Create a new category
router.post(
  "/",
  [checkJwt, checkRole(["ADMIN"])],
  CategoryController.newCategory
);

//Edit one category
router.patch(
  "/:id",
  [checkJwt, checkRole(["ADMIN"])],
  CategoryController.editCategory
);

//Delete one category
router.delete(
  "/:id",
  [checkJwt, checkRole(["ADMIN"])],
  CategoryController.deleteCategory
);

export default router;
