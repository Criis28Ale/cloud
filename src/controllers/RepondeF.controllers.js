import {getConnection, sql} from '../database/connection.js'

export const createRespuestaF = async (req, res) => {
    try {
        const {enom, tit, id, pcor, resp} = req.body
        const pool = await getConnection()
        const result = await pool.request()
        .input("Enombre", sql.VarChar, enom)
        .input("Titulo", sql.VarChar, tit)
        .input("idF", sql.Int, id)
        .input("Pcorreo", sql.VarChar, pcor)
        .input("resp", sql.VarChar, resp)
        .query('INSERT INTO RespondeF VALUES (@Enombre, @Titulo, @idF, @Pcorreo, @resp)')
        result.output = 'Se guardo su respuesta';
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const getRespuestaF_byTit = async (req, res) => {
    try {
        const {enom, tit, id} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Enombre", enom)
        .input("Titulo", tit)
        .input("idF", id)
        .query(`SELECT F.pregunta, R.res, R.Pcorreo 
                FROM RespondeF R, Formularios F 
                WHERE F.Enombre = R.Enombre AND F.titulo=R.titulo AND F.idF=R.idF  
                AND F.Enombre=@Enombre AND F.titulo=@Titulo AND F.idF=@idF
                GROUP BY R.Pcorreo, R.idF, F.pregunta, R.res`)
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const getResF_byPcor = async (req, res) => {
    try {
        const {enom, tit, pcor} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Enombre", enom)
        .input("Titulo", tit)
        .input("Pcorreo", pcor)
        .query('SELECT * FROM RespondeF WHERE Enombre=@Enombre AND Titulo=@Titulo AND Pcorreo=@Pcorreo')
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}