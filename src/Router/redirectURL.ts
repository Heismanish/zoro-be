import express, { Request, Response } from "express";
import urlModel from "../Model/url";
import userAuthenticator from "../Middlewares/UserAuthenticator";

const router = express.Router();

router.get(
	"/:shortId",
	userAuthenticator,
	async (req: Request, res: Response) => {
		try {
			const shortId = req.params.shortId;
			const urlinDb = await urlModel.findOneAndUpdate(
				{ url: shortId },
				{ $push: { visitHistory: { timeStamp: Date.now() } } }
			);

			if (urlinDb && urlinDb.originalUrl) {
				console.log(urlinDb);
				return res.status(200).redirect(urlinDb.originalUrl);
			} else {
				res.status(404).json({ message: "Couldn't find Original link in DB" });
			}
		} catch (error) {
			console.error("Some error occured while redirecting", error);
			res
				.status(500)
				.json({ message: "Some error occured  while redirecting" });
		}
	}
);

router.get("/gen/:shortId", async (req: Request, res: Response) => {
	try {
		const shortId = req.params.shortId;
		const urlinDb = await urlModel.findOneAndUpdate(
			{ url: shortId },
			{ $push: { visitHistory: { timeStamp: Date.now() } } }
		);

		if (urlinDb && urlinDb.originalUrl) {
			console.log(urlinDb);
			return res.status(200).redirect(urlinDb.originalUrl);
		} else {
			res.status(404).json({ message: "Couldn't find Original link in DB" });
		}
	} catch (error) {
		console.error("Some error occured while redirecting", error);
		res.status(500).json({ message: "Some error occured  while redirecting" });
	}
});

export default router;
