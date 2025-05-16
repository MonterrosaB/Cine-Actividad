import dotenv from "dotenv"

dotenv.config()

export const config = {
    DB : {
        URI : process.env.DB_URI

    },
    SERVER : {
        PORT : process.env.PORT
    },
    JWT : {
        SECRET : process.env.JWT_SECRET, 
        EXPIRES : process.env.JWT_EXPIRES 
    },
    ADMIN:{
        PASSWORD : process.env.ADMIN_PASSWORD,
        EMAIL : process.env.ADMIN_EMAIL
    },
    MAIL : {
        USER : process.env.USER,
        PASSWORD : process.env.PASSWORD
    },
    CLOUD : {
        NAME : process.env.CLOUD,
        APIKEY : process.env.APIKEY,
        SECRET : process.env.APISECRET
    } 
}