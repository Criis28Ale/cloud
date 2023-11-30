import {getConnection, sql} from '../database/connection'

export const getCursos = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request()
        .query('SELECT * FROM Cursos')
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const getCursos_byCnom = async (req, res) => {
    try {
        const {cnom} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Cnombre", cnom)
        .query('SELECT * FROM Cursos WHERE Cnombre=@Cnombre')
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const cerateCursos = async (req, res) => {
    try {
        const {cnom, cdesc, requi, cat, dur, dift, cost} = req.body
        const pool = await getConnection()
        const result = await pool.request()
        .input("Cnombre", sql.VarChar, cnom)
        .input("Cdescripcion", sql.VarChar, cdesc)
        .input("requisitos", sql.VarChar, requi)
        .input("categoria", sql.VarChar, cat)
        .input("duracion", sql.VarChar, dur)
        .input("dificultad", sql.VarChar, dift)
        .input("coste", sql.Int, cost)
        .query(`INSERT INTO Cursos 
                VALUES (@Cnombre, @Cdescripcion, @requisitos, @categoria, @duracion, @dificultad, @coste)`)
        result.output = 'Se creo el Curso ' + cnom
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const deleteCurso = async (req, res) => {
    try {
        const {cnom} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Cnombre", cnom)
        .query('DELETE FROM Cursos WHERE Cnombre=@Cnombre')
        result.output = 'Se elimino el curso: ' + cnom
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}