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
function HandleSignup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("signup");
        try {
            const { name, email, password } = req.body;
            const hashPass = yield bcrypt_1.default.hash(password, 10);
            const existingUser = yield user_1.default.findOne({ email });
            if (existingUser) {
                return res.status(401).json({ message: "User already present" });
            }
            const token = jsonwebtoken_1.default.sign({ email, hashPass }, __1.SECRET);
            console.log("hello");
            const user = yield user_1.default.create({
                name,
                email,
                password: hashPass,
            });
            console.log(user);
            res.cookie("uid", token, { httpOnly: true, path: "/", sameSite: "none" });
            console.log(token);
            return res.json({ message: "user created", token });
        }
        catch (error) {
            console.error(error);
            res.json({ message: "Signup failed bro" });
        }
    });
}
exports.default = HandleSignup;
