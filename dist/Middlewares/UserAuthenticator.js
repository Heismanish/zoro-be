"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
function userAuthenticator(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, __1.SECRET, (err, user) => {
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
    }
    else {
        res.status(401).json({ message: "Token not found" });
    }
    return;
}
exports.default = userAuthenticator;
