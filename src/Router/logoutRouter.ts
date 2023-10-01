import express, { Request, Response } from "express";
// import cookieParser from "cookie-parser";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
	try {
		res.clearCookie("token");
		return res.json({ message: "Logged out successfully" });
	} catch (error) {
		console.error("Error logging out");
		res.status(500).json({ message: "Error while logging out" });
	}
});

export default router;
