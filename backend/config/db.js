const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const mongoose = require("mongoose");

// mongoatlas

// const connectDB = async () => {
//     console.log(process.env.MONGO_URI);
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useCreateIndex: true,
//         });
//         console.log("MongoDB connection SUCCESS");
//     } catch (error) {
//         console.error("MongoDB connection Failure", error);
//         process.exit(1);
//     }
// }


// local mongo
const connectDB = async () => {
    console.log(process.env.LOCAL_MONGO_URI);
    try {
        await mongoose.connect(process.env.LOCAL_MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log("MongoDB connection SUCCESS");
    } catch (error) {
        console.error("MongoDB connection Failure", error);
        process.exit(1);
    }
}

module.exports = connectDB;