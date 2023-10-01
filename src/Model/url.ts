import mongoose from "mongoose";
import { isExportDeclaration } from "typescript";

const urlSchema = new mongoose.Schema(
	{
		url: {
			type: String,
			required: true,
			unique: true,
		},
		originalUrl: {
			type: String,
			required: true,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
		visitHistory: [{ timeStamp: { type: Number } }],
	},
	{ timestamps: true }
);

const urlModel = mongoose.model("url", urlSchema);

export default urlModel;
