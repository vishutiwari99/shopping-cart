require('dotenv').config();
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const fileUpload = require('express-fileupload')
const express = require('express');
const connectDB = require('./config/db')
const errorHandler = require('./middleware/Error')

const morgan = require("morgan")
const cookieParser = require('cookie-parser');
const productRoutes = require('./routes/productRoutes')

const categoryRoutes = require('./routes/categoryRoutes')
const authRoutes = require('./routes/authRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
// const privateRoutes = require('./routes/privateRoutes')
const cors = require('cors');
connectDB();
const app = express();

//  middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))


// routes middleware
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', uploadRoutes);

// auth routes
app.use('/api/auth', authRoutes)

// Error handler (Should be the last piece of middleware)

app.use(errorHandler);
const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error:${err}`);
    server.close(() => process.exit(1))
})
