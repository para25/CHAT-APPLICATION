// const mongoose = require('mongoose');
// const connectDB = async() => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useCreateIndex: true,
//             useFindAndModify: false
//         });
//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (err) {
//         console.error(err);
//         process.exit(1); // Exit process with failure
//     }
// };

// module.exports = connectDB;