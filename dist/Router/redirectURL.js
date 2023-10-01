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
const express_1 = __importDefault(require("express"));
const url_1 = __importDefault(require("../Model/url"));
const UserAuthenticator_1 = __importDefault(require("../Middlewares/UserAuthenticator"));
const router = express_1.default.Router();
router.get("/:shortId", UserAuthenticator_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortId = req.params.shortId;
        const urlinDb = yield url_1.default.findOneAndUpdate({ url: shortId }, { $push: { visitHistory: { timeStamp: Date.now() } } });
        if (urlinDb && urlinDb.originalUrl) {
            console.log(urlinDb);
            return res.status(200).redirect(urlinDb.originalUrl);
        }
        else {
            res.status(404).json({ message: "Couldn't find Original link in DB" });
        }
    }
    catch (error) {
        console.error("Some error occured while redirecting", error);
        res
            .status(500)
            .json({ message: "Some error occured  while redirecting" });
    }
}));
router.get("/gen/:shortId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortId = req.params.shortId;
        const urlinDb = yield url_1.default.findOneAndUpdate({ url: shortId }, { $push: { visitHistory: { timeStamp: Date.now() } } });
        if (urlinDb && urlinDb.originalUrl) {
            console.log(urlinDb);
            return res.status(200).redirect(urlinDb.originalUrl);
        }
        else {
            res.status(404).json({ message: "Couldn't find Original link in DB" });
        }
    }
    catch (error) {
        console.error("Some error occured while redirecting", error);
        res.status(500).json({ message: "Some error occured  while redirecting" });
    }
}));
exports.default = router;
