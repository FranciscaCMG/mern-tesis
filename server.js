const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')


dotenv.config()
app.use(express.json())

if (process.env.NODE_ENV === 'local') {
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }))
} else {
    app.use(cors({
        credentials: true
    }))
}

app.use('/api', require('./routes/designRoutes'))
app.use('/api', require('./routes/authRoutes'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "./frontend/dist")))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "./", "frontend", "dist", "index.html"))
    })
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            'mongodb+srv://cwy:test123@cluster0.g8znc.mongodb.net/testdb?retryWrites=true&w=majority&appName=Cluster0'
            );
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

connectDB()

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server is running on port ${PORT}..`))