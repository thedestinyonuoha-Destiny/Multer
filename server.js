const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT || 3000
const sequelize = require('./database/database.js')
const productRouter = require('./routes/productRouter')

const app = express()
app.use(express.json())
app.use(productRouter)

const DB = async () => {
    try {
        await sequelize.authenticate()
        console.log('Database connection was successful')
    }catch(error){
        console.log('Database connection failed', error.message)
    }
}
DB()

app.listen(PORT, ()=> {
    console.log(`server is running on PORT: ${PORT}`)
})