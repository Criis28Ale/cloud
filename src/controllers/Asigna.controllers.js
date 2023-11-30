import {getConnection, sql} from '../database/connection'

export const getAsigna_byPcor = async (req, res) => {
    try {
        const {pcor, cnom} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Pcorreo", pcor)
        .input("Cnombre", cnom)
        .query('SELECT * FROM Asigna WHERE Pcorreo=@Pcorreo AND Cnombre=@Cnombre')
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const getAsigna_byCnom = async (req, res) => {
    try {
        const {cnom} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Cnombre", cnom)
        .query('SELECT * FROM Asigna WHERE Cnombre=@Cnombre')
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const createAsigna = async (req, res) => {
    try {
        const {pcor, cnom, est} = req.body
        const pool = await getConnection()
        const result = await pool.request()
        .input("Pcorreo", sql.VarChar, pcor)
        .input("Cnombre", sql.VarChar, cnom)
        .input("estado", sql.VarChar, est)
        .query(`INSERT INTO Asigna VALUES (@Cnombre, @Pcorreo, @estado)`)
        result.output = 'Se asgino ' + pcor + " al curso " + cnom
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const updateAsigna = async (req, res) => {
    try {
        const {pcor, cnom, est} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Pcorreo", pcor)
        .input("Cnombre", cnom)
        .input("estado", est)
        .query(`UPDATE Asigna SET estado=@estado 
                WHERE Pcorreo=@Pcorreo AND Cnombre=@Cnombre`)
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const deleteAsigna = async (req, res) => {
    try {
        const {pcor, cnom} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Pcorreo", sql.VarChar,pcor)
        .input("Cnombre", sql.VarChar, cnom)
        .query(`DELETE FROM Asigna 
                WHERE Pcorreo=@Pcorreo AND Cnombre=@Cnombre`)
        result.output = pcor + ' se desasigno el curso ' + cnom
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const getAsigna_byC = async (req, res) => {
    try {
        const {pcor} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Pcorreo", pcor)
        .query('SELECT * FROM Asigna WHERE Pcorreo=@Pcorreo')
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}