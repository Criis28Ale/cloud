import {getConnection, sql} from '../database/connection'

export const getPropuesta = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request()
        .query('SELECT * FROM Propuestas')
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const createPropuesta = async (req, res) => {
    try {
        const {enom, tit, desc, requi} = req.body
        const pool = await getConnection()
        const result = await pool.request()
        .input('Enombre', sql.VarChar, enom)
        .input('Titulo', sql.VarChar, tit)
        .input('descripcion', sql.VarChar, desc)
        .input('requisitos', sql.VarChar, requi)
        .query('INSERT INTO Propuestas VALUES (@Enombre, @Titulo, @descripcion, @requisitos)')
        result.output = 'Propuesta Creada'
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const getPropuesta_byEnom = async (req, res) => {
    try {
        const {enom} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Enombre", enom)
        .query('SELECT * FROM Propuestas WHERE Enombre=@Enombre')
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const getPropuesta_byTit = async (req, res) => {
    try {
        const {enom, tit} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Enombre", enom)
        .input("Titulo", tit)
        .query('SELECT * FROM Propuestas WHERE Enombre=@Enombre AND Titulo=@Titulo')
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const deletePropuesta = async (req, res) => {
    try {
        const {enom, tit} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Enombre", enom)
        .input("Titulo", tit)
        .query('DELETE FROM Propuestas WHERE Enombre=@Enombre AND Titulo=@Titulo')
        result.output = "Propuesta " + tit + " Eliminada" 
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}