const express = require('express');
const { sendMessage, allMessage } = require("../controllers/messageContoller")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

router.route('/').post(protect, sendMessage)
    // router.route('/').post(protect, (req, res) => sendMessage(req, res));

router.route('/:chatId').get(protect, allMessage)

module.exports = router;