const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel")
const Chat = require("../models/chatModel")
    // const User = require("../models/userModel")

const sendMessage = asyncHandler(async(req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        console.log("Invalid Data passed in request");
        return res.sendStatus(400);
    }

    try {
        const newMessage = {
            sender: req.user._id,
            content: content,
            chat: chatId,
        };

        let message = await Message.create(newMessage);
        message = await message.populate("sender", "name pic");
        message = await message.populate({
            path: "chat.users",
            populate: {
                path: "users",
                select: "name pic email",
            },
        });

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        });

        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});



const allMessage = asyncHandler(async(req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name pic email")
            .populate({
                path: "chat",
                populate: {
                    path: "users",
                    select: "name pic email"
                }
            });
        console.log("Messages fetched:", messages);
        res.json(messages);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


module.exports = { sendMessage, allMessage }