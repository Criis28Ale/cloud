import {getConnection, sql} from '../database/connection.js'

export const getFormulario_byTit = async (req, res) => {
    try {
        const {enom, tit} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Enombre", enom)
        .input("Titulo", tit)
        .query('SELECT * FROM Formularios WHERE Enombre=@Enombre AND Titulo=@Titulo')
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const createFormularios = async (req, res) => {
    try {
        const {enom, tit, id, preg} = req.body
        const pool = await getConnection()
        const result = await pool.request()
        .input("Enombre", sql.VarChar, enom)
        .input("Titulo", sql.VarChar, tit)
        .input("idF", sql.Int, id)
        .input("pregunta", sql.VarChar, preg)
        .query('INSERT INTO Formularios VALUES (@Enombre, @Titulo, @idF, @pregunta)')
        result.output = 'Formulario Creado'
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const deleteFormularios = async (req, res) => {
    try {
        const {enom, tit, id} = req.params
        const pool = await getConnection()
        const result = await pool.request()
        .input("Enombre", enom)
        .input("Titulo", tit)
        .input("idF", id)
        .query('DELETE FROM Formularios WHERE Enombre=@Enombre AND Titulo=@Titulo AND idF=@idF')
        result.output = 'Se elimino pregunta numero ' + id
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}
