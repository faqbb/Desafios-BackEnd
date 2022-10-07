import dotenv from 'dotenv'

dotenv.config()

export default {
    app:{
        DEBUG: process.env.DEBUG||false,
        MODE: process.env.MODE||"PROD"
    }
}