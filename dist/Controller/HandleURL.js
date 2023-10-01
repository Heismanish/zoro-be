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
const url_1 = __importDefault(require("../Model/url"));
const nanoid_1 = require("nanoid");
function handleURl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalUrl = req.query.url;
        if (!originalUrl) {
            return res.status(400).json({ message: "URL is required" });
        }
        const shortId = (0, nanoid_1.nanoid)(8);
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
            const urlInDB = yield url_1.default.create({
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
        }
        catch (error) {
            console.error("Some error occured during generating short id", error);
            res
                .status(500)
                .json({ message: "Some error occured during generating short id" });
        }
    });
}
exports.default = handleURl;
