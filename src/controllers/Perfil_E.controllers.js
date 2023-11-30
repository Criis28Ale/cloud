import {getConnection, sql} from '../database/connection.js'
const jwt = require('jsonwebtoken')

export const getPerfilE = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request()
        .query('SELECT * FROM Perfil_E')
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const createPerfilE = async (req, res) => {
    try {
        const {ecor, enom, pass, tel} = req.body
        const pool = await getConnection()
        const result = await pool.request()
        .input("Ecorreo", sql.VarChar, ecor)
        .input("Enombre", sql.VarChar, enom)
        .input("pass", sql.VarChar, pass)
        .input("telefono", sql.Char, tel)
        .query('INSERT INTO Perfil_E VALUES (@Ecorreo, @Enombre, @pass, @telefono)')
        result.output = 'Perfil Creado';
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message + "Hola")
    }
}

export const getPerfilE_by = async (req, res) => {
    try {
        const {enom} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Enombre", enom)
        .query('SELECT * FROM Perfil_E WHERE Enombre=@Enombre')
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const getPerfilE_byCor = async (req, res) => {
    try {
        const {ecor, pass} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Ecorreo", ecor)
        .input("pass", pass)
        .query('SELECT * FROM Perfil_E WHERE Ecorreo=@Ecorreo AND pass=@pass')
        if (result.rowsAffected[0] > 0) {
            res.json({succes: "Correcto", token: createToken(ecor, pass), afect: result.rowsAffected[0], values: result.recordset[0].Enombre})
        } else {
            res.json({succes: "Correcto", token: createToken(ecor, pass), afect: result.rowsAffected[0]})
        }
        
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