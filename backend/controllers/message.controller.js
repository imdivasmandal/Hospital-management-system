import { Message } from "../models/message.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const sendMessage = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;
    if (
        [firstName, lastName, email, message].some((field) => field?.trim() === "") ||
        !phone
    ) {
      throw new ApiError(400, "Please Fill Full Form");
    }
    const msg = await Message.create({ firstName, lastName, email, phone, message });
    console.log(msg);
    return res.status(200).json(
      new ApiResponse(200, msg, "Message sent sucessfully")
    );
});


const getAllMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find();
  return res.status(200).json({
    success: true,
    messages,
  });
});

export {
  sendMessage,
  getAllMessages,
}