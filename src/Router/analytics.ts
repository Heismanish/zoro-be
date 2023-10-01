import express, { Request, Response } from "express";
import userAuthenticator from "../Middlewares/UserAuthenticator";
import userModel from "../Model/user";
import urlModel from "../Model/url";
const router = express.Router();

interface JwtPayload {
	userId: string;
	// other properties in your JWT payload
}
interface CustomRequest extends Request {
	userData?: JwtPayload;
	// other properties in your custom request object
}

router.get(
	"/",
	userAuthenticator,
	async (req: CustomRequest, res: Response) => {
		try {
			const user = req.userData;
			if (!user) {
				return res.json({ message: "user data not find " });
			}
			if (req.userData && req.userData.userId) {
				const urlData = await urlModel.find({ createdBy: user.userId });
				console.log(urlData);
				return res.json({ ...urlData });
			}
		} catch (error) {
			console.error("Error while fetching analytics");
			res.status(500).json({ message: "Error while fetching analytics" });
		}
	}
);

export default router;
