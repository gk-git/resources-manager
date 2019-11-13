import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import fake from "./fake";
import post from "./resources/post";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.send("Ok");
});
routes.use("/fake", fake);
routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/resources/post", post);

export default routes;
