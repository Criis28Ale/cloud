import {getConnection, sql} from '../database/connection.js'

export const createRespuestaC = async (req, res) => {
    try {
        const {cnom, cid, numc, pcor, resp, est} = req.body
        const pool = await getConnection()
        const result = await pool.request()
        .input("Cnombre", sql.VarChar, cnom)
        .input("Cid", sql.Int, cid)
        .input("NumC", sql.Int, numc)
        .input("Pcorreo", sql.VarChar, pcor)
        .input("respuesta", sql.VarChar, resp)
        .input("estadoRC", sql.VarChar, est)
        .query(`INSERT INTO RespondeC 
                VALUES (@Cnombre, @Cid, @NumC, @Pcorreo, @respuesta, @estadoRC)`)
        result.output = 'Se guardo su respuesta';
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const getResC_byPcor = async (req, res) => {
    try {
        const {cnom, cid, pcor} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Cnombre", cnom)
        .input("Cid", cid)
        .input("Pcorreo", pcor)
        .query(`SELECT * FROM RespondeC 
                WHERE Cnombre=@Cnombre AND Cid=@Cid AND Pcorreo=@Pcorreo`)
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const getResC_byCid = async (req, res) => {
    try {
        const {cnom, cid} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Cnombre", cnom)
        .input("Cid", cid)
        .query(`SELECT * FROM RespondeC 
                WHERE Cnombre=@Cnombre AND Cid=@Cid`)
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const updateResC = async (req, res) => {
    try {
        const {cnom, cid, pcor, numc, est} = req.body
        const pool = await getConnection()
        const result = await pool.request()
        .input("Cnombre", cnom)
        .input("Cid", cid)
        .input("Pcorreo", pcor)
        .input("NumC", numc)
        .input("estadoRC", est)
        .query(`UPDATE RespondeC SET estadoRC=@estadoRC
                WHERE Cnombre=@Cnombre AND Cid=@Cid AND Pcorreo=@Pcorreo AND NumC=@NumC`)
        result.output = "La respuesta numero: " + numc + " de " + pcor + " esta " + est
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const deleteResC = async (req, res) => {
    try {
        const {cnom, cid, pcor} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Cnombre", cnom)
        .input("Cid", cid)
        .input("Pcorreo", pcor)
        .query(`DELETE FROM RespondeC 
                WHERE Pcorreo=@Pcorreo AND Cid=@Cid AND Cnombre=@Cnombre`)
        result.output = 'Se reinicio el Cuestionario'
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}