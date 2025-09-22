import {Router} from "express";

const router = Router();

router.get("/ping", (req, res) => {
  console.log("Pong")
  res.send("pong")
})

export default router;