import express from 'express'
import config from './config'
const cors = require("cors");

import perfil_eRoutes from './routes/perfil_e.routes.js'

const app = express()

app.set('port', config.port)
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(perfil_eRoutes)

export default app