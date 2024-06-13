const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// const connectDB = require('./config/db.js');
const chatsData = require('./data/data.js');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require("./routes/userRoutes.js")
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js")
const chatRoutes = require("./routes/chatRoutes.js")
const messageRoutes = require("./routes/messageRoutes.js")

app.use(cors());
dotenv.config();
app.use(express.json())

const connectDB = async() => {
    try {
        const conn = await mongoose.connect("mongodb+srv://Prasad:Prasad251@cluster0.stmvjht.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1); // Exit process with failure
    }
};

connectDB();


app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)

// app.get('/api/chats', (req, res) => {
//     res.json(chatsData);
// });



// app.get('/api/chat/:id', (req, res) => {
//     const chatId = parseInt(req.params.id);
//     const chat = chatsData.find(chat => chat.profile.id === chatId);

//     if (chat) {
//         res.json(chat);
//     } else {
//         res.status(404).json({ message: 'Chat not found' });
//     }
// });


app.use(notFound)
app.use(errorHandler)


// const PORT = process.env.PORT || 3000;
const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server hosted on ${PORT}`);
});