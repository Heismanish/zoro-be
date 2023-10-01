"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HandleSignup_1 = __importDefault(require("../Controller/HandleSignup"));
const HandleLogin_1 = __importDefault(require("../Controller/HandleLogin"));
const router = express_1.default.Router();
router.post("/signup", HandleSignup_1.default);
router.post("/login", HandleLogin_1.default);
exports.default = router;
