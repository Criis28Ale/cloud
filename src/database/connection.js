import sql from 'mssql'

const dbsetting = {
    user: 'admin',
    password: 'root123-',
    server: 'database-2.cbklfbxzenuh.us-east-1.rds.amazonaws.com',
    database: 'cloud',
    port: 1433,
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