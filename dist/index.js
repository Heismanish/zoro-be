"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const urlRoute_1 = __importDefault(require("./Router/urlRoute"));
const userRoute_1 = __importDefault(require("./Router/userRoute"));
const redirectURL_1 = __importDefault(require("./Router/redirectURL"));
const analytics_1 = __importDefault(require("./Router/analytics"));
const logoutRouter_1 = __importDefault(require("./Router/logoutRouter"));
dotenv_1.default.config();
// Env variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
exports.SECRET = process.env.SECRET || "";
// Server
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Routes
app.get("/", (req, res) => {
    return res.send("this is home");
});
app.use("/url", urlRoute_1.default);
app.use("/user", userRoute_1.default);
app.use("/i", redirectURL_1.default);
app.use("/analytics", analytics_1.default);
app.use("/logout", logoutRouter_1.default);
// DB connection
mongoose_1.default.connect(MONGO_URI, {});
mongoose_1.default.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});
mongoose_1.default.connection.on("error", (err) => {
    console.error("MongoDB connection error: " + err);
});
mongoose_1.default.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
