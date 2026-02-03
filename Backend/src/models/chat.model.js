import mongoose, { Schema } from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref:"User",
                required: true
            }
        ],
        lastMessage:
        {
            type: Schema.Types.ObjectId,
            ref:"Message",
            default:null
        },
        lastMessageAt: {
            type: Date,
            default: Date.now,
        },
    },
    {timestamps: true}
);
const Chat = mongoose.model("Chat", chatSchema);

export default Chat;