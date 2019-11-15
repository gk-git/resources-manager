import { Router } from "express";
import FakeController from "../controllers/FakeController";

const router = Router();

//Get all users
router.get("/users", FakeController.createUsers);
router.get("/categories", FakeController.createCategories);
router.get("/tags", FakeController.createTags);
router.get("/posts", FakeController.createPosts);

export default router;
