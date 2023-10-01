import { Request, Response } from "express";
import userModel from "../Model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "..";

async function HandleLogin(req: Request, res: Response) {
	const { email, password } = req.body;
	try {
		const existingUser = await userModel.findOne({ email });
		if (!existingUser) {
			return res.status(404).json({ message: "User not found" });
		}
		bcrypt.compare(password, existingUser.password, (err, matchedPassword) => {
			if (err) {
				// if some error occured
				res.status(400).json({ message: "Error while verifying password" });
			} else if (matchedPassword) {
				// if password matched
				const token = jwt.sign(
					{
						email: existingUser.email,
						userId: existingUser._id,
					},
					SECRET
				);
				res.cookie("uid", token, { httpOnly: true });
				res.json({ message: "User signed In", token });
			} else {
				// password didn't match
				res.status(404).json({ message: "Invalid password" });
			}
		});
		// const user = jwt.verify(token, SECRET);

		// if(user.email){

		// }
		// const userInDB = await userModel.findOne({ user.email });
		// if (!userInDB) {
		// 	return res
		// 		.status(404)
		// 		.render("login", { message: "User not found in db" });
		// }
		// const isPasswordValid = await bcrypt.compare(password, userInDB.password);

		// console.log("Login route working");

		// if (!isPasswordValid) {
		// 	return res.status(401).render("login", { message: "Invalid Password" });
		// }

		// // CREATING SESSION ID:
		// // const sessionId = uuidv4();
		// // setUser(sessionId, userInDB);
		// res.cookie("uid", token);

		// return res.redirect("/");
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error occured while sign-in" });
	}
}

export default HandleLogin;
