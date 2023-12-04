
import {getConnection, sql} from '../database/connection.js'
const OpenAI = require('openai');

export const getAplica_byTit = async (req, res) => {
    try {
        const {enom, tit} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Enombre", enom)
        .input("Titulo", tit)
        .query('SELECT * FROM Aplica WHERE Enombre=@Enombre AND Titulo=@Titulo')
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const getAplica_byPcor = async (req, res) => {
    try {
        const {enom, tit, pcor} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Enombre", enom)
        .input("Titulo", tit)
        .input("Pcorreo", pcor)
        .query('SELECT * FROM Aplica WHERE Enombre=@Enombre AND Titulo=@Titulo AND Pcorreo=@Pcorreo')
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const createAplica = async (req, res) => {
    try {
        const {enom, tit, pcor, aest, adesc, ana} = req.body
        const pool = await getConnection()
        const result = await pool.request()
        .input("Enombre", sql.VarChar, enom)
        .input("Titulo", sql.VarChar, tit)
        .input("Pcorreo", sql.VarChar, pcor)
        .input("Aestado", sql.VarChar, aest)
        .input("Adescripcion", sql.VarChar, adesc)
        .input("analisis", sql.VarChar, ana)
        .query('INSERT INTO Aplica VALUES (@Enombre, @Titulo, @Pcorreo, @Aestado, @Adescripcion, @analisis)')
        result.output = 'Aplicaste correctamente a la Propuestas ' + tit
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const updateAplica = async (req, res) => {
    try {
        const {enom, tit, pcor, aest} = req.body
        const pool = await getConnection()
        const result = await pool.request()
        .input("Enombre", sql.VarChar, enom)
        .input("Titulo", sql.VarChar, tit)
        .input("Pcorreo", sql.VarChar, pcor)
        .input("Aestado", sql.VarChar, aest)
        .query(`UPDATE Aplica SET Aestado=@Aestado 
                WHERE Enombre=@Enombre AND Titulo=@Titulo AND Pcorreo=@Pcorreo`)
        result.output = 'Fue ' + aest + ' a la Propuesta'
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const getA_byPcor = async (req, res) => {
    try {
        const {pcor} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Pcorreo", pcor)
        .query('SELECT * FROM Aplica WHERE Pcorreo=@Pcorreo')
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}


