const corsOptions = {
    origin: ["http://localhost:3000", "https://api.coreerp.matriz.com.es", "http://api.coreerp.matriz.com.es"],


    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],

    credentials: true,

    maxAge: 86400,
}

module.exports = corsOptions

