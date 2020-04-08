import express from 'express'
import { PORT } from './config/config'
import router from './routes/index.route'
import bodyParser from 'body-parser'
import './database/connection'


const app = express()
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use(router)

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})