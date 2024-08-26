const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const { getReceiverSocketId, getIo } = require("../socket");

const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    let gotConversation = await Conversation.findOne({
      participant: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participant: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }
    await Promise.all([gotConversation.save(), newMessage.save()]);

    // Socket IO
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      const io = getIo();
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json({
      newMessage,
    });
  } catch (error) {
    console.log(error);
  }
};

const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;
    const conversation = await Conversation.findOne({
      participant: { $all: [senderId, receiverId] },
    }).populate("messages");
    return res.status(201).json(conversation?.messages);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMessage, getMessage };
