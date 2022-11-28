
require('dotenv/config')

export default {
    HOSTNAME :  '127.0.0.1',
    PORT : 8000 || process.env.PORT,
    DB_URI : process.env.DB_CONNECTION,
    TOKEN_SECRET : "dfasdjrqwu3409234dfadadfowerq3432frwij23490oi",
    SALT : "jf;kas;fdjjdfasdfaksd;fasdf"
}