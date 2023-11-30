const jwt = require('jsonwebtoken')

const checktoken =  (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.json({error: "Debes de incluir el token"})
    }

    const token = req.headers['authorization']

    let payload
    try {
        payload = jwt.verify(token, 'Prueba para el token')    
    } catch (error) {
        return res.json({error: "Token Incorrecto"})   
    }

    

    next()
}

module.exports = { checktoken }