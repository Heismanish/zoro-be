import express, { Request, Response } from "express";
import handleURl from "../Controller/HandleURL";
import userAuthenticator from "../Middlewares/UserAuthenticator";
import urlModel from "../Model/url";
import { nanoid } from "nanoid";

const router = express.Router();

router.get("/", userAuthenticator, handleURl);

router.get("/gen", async (req: Request, res: Response) => {
	const originalUrl = req.query.url as string;

	if (!originalUrl) {
		return res.status(400).json({ message: "URL is required" });
	}

	const shortId = nanoid(8);

	console.log("Uhsububf");

	try {
		const urlInDB = await urlModel.create({
			url: shortId,
			originalUrl: originalUrl,
			visitHistory: [],
		});
		console.log(shortId);
		res.json({ message: "short id has been created ", shortId: urlInDB.url });
	} catch (error) {
		console.error("Some error occured during generating short id", error);
		res
			.status(500)
			.json({ message: "Some error occured during generating short id" });
	}
});

export default router;
