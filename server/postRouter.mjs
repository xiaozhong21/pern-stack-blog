import express from "express";

import * as db from "./db.mjs";

const postRouter = express.Router();

postRouter.get("/", async (request, response) =>
  response.json(await db.getPosts()),
);

postRouter.get("/:id", async (request, response) =>
  response.json(await db.getPost(request.params.id)),
);

postRouter.use(express.json());
postRouter.post("/", async (request, response) => {
  response.status(201).json(await db.addPost(request.body));
});

export default postRouter;
