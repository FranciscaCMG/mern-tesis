# 🚀 Proyecto MERN - Nombre del Proyecto

[![Docker](https://img.shields.io/badge/Docker-Supported-blue)](https://www.docker.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com/)
[![GitHub license](https://img.shields.io/github/license/tuusuario/tu-repo)](./LICENSE)

Proyecto basado en el stack **MERN (MongoDB, Express, React, Node.js)**.

## 📂 Estructura del Proyecto

/proyecto-mern │-- /controllers # Controladores para la lógica de negocio │-- /middlewares # Middlewares para autenticación, logs, etc. │-- /models # Modelos de la base de datos con Mongoose │-- /routes # Rutas de la API │-- /frontend # Aplicación React │-- .gitignore # Archivos a ignorar en Git │-- Dockerfile # Configuración de Docker │-- docker-compose.yml # Configuración de Docker Compose │-- server.js # Archivo principal del backend │-- package.json # Dependencias y scripts del proyecto │-- vercel.json # Configuración de despliegue en Vercel │-- README.md # Documentación del proyecto

---

## ⚙️ Instalación y Configuración

### 1️⃣ Clonar el repositorio
```bash
git clone (https://github.com/FranciscaCMG/mern-tesis.git)

2️⃣ Configurar variables de entorno
Crea un archivo .env en la raíz del proyecto y agrega:

PORT = 5000
LOCAL_DB_URI = mongodb://
NODE_ENV = 'local'

JWT_SECRET=

MONGO_INITDB_ROOT_USERNAME = 
MONGO_INITDB_ROOT_PASSWORD =
MONGO_HOST =
MONGO_PORT =

3️⃣ Instalación de dependencias
Backend

npm install

Frontend

cd frontend
npm install

🚀 Ejecución Manual

1️⃣ npm run dev


