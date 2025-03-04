const corsOptions = {
    origin: ["http://localhost:3000", "https://api.coreerp.matriz.com.es", "http://api.coreerp.matriz.com.es"],

    // Métodos HTTP permitidos
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

    // Encabezados permitidos
    allowedHeaders: ["Content-Type", "Authorization"],

    // Permite cookies y credenciales
    credentials: true,

    maxAge: 86400,
}

module.exports = corsOptions

