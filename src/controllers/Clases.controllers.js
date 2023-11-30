import {getConnection, sql} from '../database/connection.js'

export const getClases_byCnom = async (req, res) => {
    try {
        const {cnom, pcor} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Cnombre", cnom)
        .input("Pcorreo", pcor)
        .query(`SELECT L.Cnombre, L.Cid, L.Pcorreo, L.estado  
                FROM Clases C, Lleva L
                WHERE C.Cnombre=L.Cnombre AND C.Cid= L.Cid AND L.Pcorreo=@Pcorreo AND C.Cnombre=@Cnombre`)
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const getClases_byIdC = async (req, res) => {
    try {
        const {cnom, id} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Cnombre", cnom)
        .input("Cid", id)
        .query('SELECT * FROM Clases WHERE Cnombre=@Cnombre AND Cid=@Cid')
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const getClass = async (req, res) => {
    try {
        const {cnom} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Cnombre", cnom)
        .query('SELECT * FROM Clases WHERE Cnombre=@Cnombre')
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const createClases = async (req, res) => {
    try {
        const {cnom, id, pcor, est} = req.body
        const pool = await getConnection()
        const result = await pool.request()
        .input("Cnombre", sql.VarChar,cnom)
        .input("Cid", sql.Int, id)
        .input("Pcorreo", sql.VarChar, pcor)
        .input("estado", sql.VarChar, est)
        .query('INSERT INTO Lleva VALUES (@Cnombre, @Cid, @Pcorreo, @estado)')
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}