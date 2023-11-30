import {getConnection, sql} from '../database/connection.js'
const jwt = require('jsonwebtoken')

export const getPerfilP_by = async (req, res) => {
    try {
        const {cor} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Pcorreo", cor)
        .query('SELECT * FROM Perfil_P WHERE Pcorreo=@Pcorreo')
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const createPerfilP = async (req, res) => {
    try {
        const {pnom, ape, dpi, pcor, pass} = req.body
        const pool = await getConnection()
        const result = await pool.request()
        .input("Pnombre", sql.VarChar, pnom)
        .input("apellido", sql.VarChar, ape)
        .input("dpi", sql.Char, dpi)
        .input("Pcorreo", sql.VarChar, pcor)
        .input("pass", sql.VarChar, pass)
        .query('INSERT INTO Perfil_P VALUES (@Pnombre, @apellido, @dpi, @Pcorreo, @pass)')
        result.output = 'Se creo el Perfil Personal'
        res.json(result)
        
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

function createToken(correo, pass){
    const payload = {
        corr: correo,
        pass: pass 
    }
    return jwt.sign(payload, 'Prueba para el token')

}

export const getPerfilP_byCor = async (req, res) => {
    try {
        const {cor, pass} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Pcorreo", cor)
        .input("pass", pass)
        .query('SELECT * FROM Perfil_P WHERE Pcorreo=@Pcorreo AND pass=@pass')
        res.json({succes: "Correcto", token: createToken(cor, pass),values: result.rowsAffected[0]})
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}
