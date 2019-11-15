import { Router } from "express";
import PendingPostController from "../../controllers/PendingPostController";
import { checkJwt } from "../../middleware/checkJwt";
import { checkRole } from "../../middleware/checkRole";

const router = Router();

//Get all users
router.get(
  "/",
  [checkJwt, checkRole(["ADMIN"])],
  PendingPostController.listAll
);

// Get one user
router.get(
  "/:id",
  [checkJwt, checkRole(["ADMIN"])],
  PendingPostController.getOneById
);

//Create a new user
router.post("/", PendingPostController.newPendingPost);

//Edit one user
router.patch(
  "/:id",
  [checkJwt, checkRole(["ADMIN"])],
  PendingPostController.editPendingPost
);

//Delete one user
router.delete(
  "/:id",
  [checkJwt, checkRole(["ADMIN"])],
  PendingPostController.deletePendingPost
);

export default router;
