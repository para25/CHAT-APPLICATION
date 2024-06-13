const express = require('express');
const { registerUser, authUser, allUser } = require("../controllers/userController.js")
const { protect } = require("../middleware/authMiddleware.js")


const router = express.Router()
router.route("/").post(registerUser).get(protect, allUser)
router.post('/login', authUser)

module.exports = router;