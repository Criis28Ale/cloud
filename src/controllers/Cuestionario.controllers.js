import {getConnection, sql} from '../database/connection'

export const getCuestionario_byCid = async (req, res) => {
    try {
        const {cnom, cid} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Cnombre", cnom)
        .input("Cid", cid)
        .query('SELECT * FROM Cuestionario WHERE Cnombre=@Cnombre AND Cid=@Cid')
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const createCuestionario = async (req, res) => {
    try {
        const {cnom, cid, numc, cpreg, respc} = req.body
        const pool = await getConnection()
        const result = await pool.request()
        .input("Cnombre", sql.VarChar, cnom)
        .input("Cid", sql.Int, cid)
        .input("NumC", sql.Int, numc)
        .input("Cpregunta", sql.VarChar, cpreg)
        .input("respuestaC", sql.VarChar, respc)
        .query('INSERT INTO Cuestionario VALUES (@Cnombre, @Cid, @NumC, @Cpregunta, @respuestaC)')
        result.output = 'Pregunta guardada exitosamente'
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const deleteCuestionario = async (req, res) => {
    try {
        const {cnom, cid, numc} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Cnombre", cnom)
        .input("Cid", cid)
        .input("NumC", numc)
        .query(`DELETE FROM Cuestionario 
                WHERE Cnombre=@Cnombre AND Cid=@Cid AND NumC=@Numc`)
        result.output = 'Se eliminar la pregunta numero: ' + numc
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

