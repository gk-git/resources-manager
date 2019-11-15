import { Router } from "express";
import TagController from "../../controllers/TagController";
import { checkJwt } from "../../middleware/checkJwt";
import { checkRole } from "../../middleware/checkRole";
import { Tag } from "../../entity/resources/Tag";

const router = Router();

//Get all users
router.get("/", [checkJwt, checkRole(["ADMIN"])], TagController.listAll);

// Get one user
router.get("/:id", [checkJwt, checkRole(["ADMIN"])], TagController.getOneById);

//Create a new user
router.post("/", [checkJwt, checkRole(["ADMIN"])], TagController.newTag);

//Edit one user
router.patch("/:id", [checkJwt, checkRole(["ADMIN"])], TagController.editTag);

//Delete one user
router.delete(
  "/:id",
  [checkJwt, checkRole(["ADMIN"])],
  TagController.deleteTag
);

export default router;
