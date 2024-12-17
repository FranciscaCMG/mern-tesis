const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();
app.use(express.json());

// Configurar CORS según el entorno
if (process.env.NODE_ENV === 'local') {
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }));
} else {
    app.use(cors({
        credentials: true
    }));
}

// Configurar rutas
app.use('/api', require('./routes/designRoutes'));
app.use('/api', require('./routes/authRoutes'));

// Configuración para producción
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "./frontend/dist")));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "./", "frontend", "dist", "index.html"));
    });
}

// Conectar a la base de datos
const connectDB = async () => {
    try {
        const mongoURI = process.env.NODE_ENV === 'local'
            ? process.env.LOCAL_DB_URI
            : process.env.MONGODB_URI;

        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}..`));
