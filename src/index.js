import express from 'express'
import { PORT } from './config/config'

const app = express()

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})