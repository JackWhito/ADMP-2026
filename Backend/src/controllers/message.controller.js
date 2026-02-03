import mongoose from "mongoose";
import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

export async function getMessages(req, res) {
    try {
        const userId = req.user.id;
        const {chatId} = req.params;

        if (!mongoose.Types.ObjectId.isValid(chatId)) {
        return res.status(400).json({ message: "Invalid chatId" });
        }

        const chat = await Chat.findOne({
            _id:chatId,
            participants: userId,
        });

        if(!chat){
            res.status(404).json({message:"Chat not found"});
            return;
        }

        const limit = Number(req.query.limit) || 50;

        const messages = await Message.find({chat:chatId})
            .populate("sender","fullName email avatar")
            .sort({createdAt: 1})
            .limit(limit)
            .lean()
        res.status(200).json(messages)
    } catch (error) {
        console.error("Error in getMessages controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}