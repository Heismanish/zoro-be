import express from "express";
import HandleSignup from "../Controller/HandleSignup";
import HandleLogin from "../Controller/HandleLogin";

const router = express.Router();

router.post("/signup", HandleSignup);
router.post("/login", HandleLogin);

export default router;
