import {getConnection, sql} from '../database/connection.js'

export const getInfo = async (req, res) => {
    try {
        const {cnom, cid} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Cnombre", cnom)
        .input("Cid", cid)
        .query('SELECT * FROM Informacion WHERE Cnombre=@Cnombre AND Cid=@Cid')
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const creaeteInfo = async (req, res) => {
    try {
        const {cnom, cid, idi, tit, info, link} = req.body
        const pool = await getConnection()
        const result = await pool.request()
        .input("Cnombre", sql.VarChar, cnom)
        .input("Cid", sql.Int, cid)
        .input("idT", sql.Int, idi)
        .input("titulo", sql.VarChar, tit)
        .input("info", sql.VarChar, info)
        .input("linkV", sql.VarChar, link)
        .query('INSERT INTO Informacion VALUES (@Cnombre, @Cid, @idT, @titulo, @info, @linkV)')
        result.output = 'Se guardo la Informacion'
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

