import { Request, Response } from "express";
import userModel from "../Model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "..";

async function HandleSignup(req: Request, res: Response) {
	console.log("signup");
	try {
		const { name, email, password } = req.body;
		const hashPass = await bcrypt.hash(password, 10);

		const existingUser = await userModel.findOne({ email });
		if (existingUser) {
			return res.status(401).json({ message: "User already present" });
		}

		const token = jwt.sign({ email, hashPass }, SECRET);
		console.log("hello");
		const user = await userModel.create({
			name,
			email,
			password: hashPass,
		});

		console.log(user);
		res.cookie("uid", token, { httpOnly: true, path: "/", sameSite: "none" });
		console.log(token);
		return res.json({ message: "user created", token });
	} catch (error) {
		console.error(error);
		res.json({ message: "Signup failed bro" });
	}
}

export default HandleSignup;
