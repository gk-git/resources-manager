import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import fake from "./fake";
import post from "./resources/post";
import tag from "./resources/tag";
import category from "./resources/category";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.send("Ok");
});
routes.use("/fake", fake);
routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/resources/post", post);
routes.use("/resources/tag", tag);
routes.use("/resources/category", category);

export default routes;
