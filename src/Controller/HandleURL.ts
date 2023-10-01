import { Request, Response } from "express";
import urlModel from "../Model/url";
import { nanoid } from "nanoid";
// import { CustomRequest } from "../Middlewares/UserAuthenticator";
interface JwtPayload {
	userId: string;
	// other properties in your JWT payload
}
interface CustomRequest extends Request {
	userData?: JwtPayload;
	// other properties in your custom request object
}

async function handleURl(req: CustomRequest, res: Response) {
	const originalUrl = req.query.url as string;

	if (!originalUrl) {
		return res.status(400).json({ message: "URL is required" });
	}

	const shortId = nanoid(8);
	let createdBy;

	console.log("Hola Mola Pola Sola Zola");
	console.log(req.userData);

	if (typeof req.userData === "string" || req.userData === undefined) {
		// To evade TypeScript type error
		return res.json({ message: "Error while dealing with TypeScript " });
	}

	if (req.userData && req.userData.userId) {
		createdBy = req.userData.userId;
		console.log("akjfjb");
	}

	console.log("Uhsububf");

	try {
		const urlInDB = await urlModel.create({
			url: shortId,
			originalUrl: originalUrl,
			visitHistory: [],
			createdBy,
		});
		console.log(shortId);
		// res.cookie("id", shortId);
		return res.json({
			message: "short id has been created ",
			shortId: urlInDB.url,
		});
	} catch (error) {
		console.error("Some error occured during generating short id", error);
		res
			.status(500)
			.json({ message: "Some error occured during generating short id" });
	}
}

export default handleURl;
