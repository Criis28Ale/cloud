import sql from 'mssql'

const dbsetting = {
    user: 'AdminProyect',
    password: 'root123@',
    server: 'proyectoserverdata.database.windows.net',
    database: 'ProyectoNube',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
}

export async function getConnection() {
    try {
        const pool = await sql.connect(dbsetting)
        return pool
    } catch (error) {
        console.error(error)
    }
}

export { sql }