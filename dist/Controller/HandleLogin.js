"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../Model/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
function HandleLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const existingUser = yield user_1.default.findOne({ email });
            if (!existingUser) {
                return res.status(404).json({ message: "User not found" });
            }
            bcrypt_1.default.compare(password, existingUser.password, (err, matchedPassword) => {
                if (err) {
                    // if some error occured
                    res.status(400).json({ message: "Error while verifying password" });
                }
                else if (matchedPassword) {
                    // if password matched
                    const token = jsonwebtoken_1.default.sign({
                        email: existingUser.email,
                        userId: existingUser._id,
                    }, __1.SECRET);
                    res.cookie("uid", token, { httpOnly: true });
                    res.json({ message: "User signed In", token });
                }
                else {
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
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error occured while sign-in" });
        }
    });
}
exports.default = HandleLogin;
