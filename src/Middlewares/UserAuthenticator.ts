import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET } from "..";
import { Request, Response, NextFunction } from "express";

// to ensure that we are not getting a string type and avoid getting error in line 31
export interface CustomRequest extends Request {
	userData?: JwtPayload | string;
}

function userAuthenticator(
	req: CustomRequest,
	res: Response,
	next: NextFunction
) {
	const authHeader = req.headers.authorization;
	console.log(authHeader);
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(token, SECRET, (err, user) => {
			if (err) {
				return res.sendStatus(403);
			}
			if (!user) {
				return res.sendStatus(404);
			}
			console.log("akksjbakjb");
			// to ensure that we are not getting a string type
			// and avoid getting error in line 31
			if (typeof user === "string") {
				return res.sendStatus(403);
			}
			console.log(user.email);
			req.userData = user;
			console.log(req.userData);
			next();
		});
	} else {
		res.status(401).json({ message: "Token not found" });
	}
	return;
}

export default userAuthenticator;
