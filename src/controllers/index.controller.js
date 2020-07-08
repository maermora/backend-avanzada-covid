const { Pool } = require('pg'); // Conjunto de peticiones para Postgres

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'narinocovidapi',
    port: '5432'
})
const getPacientes = async (req, res) => {
    const response = await pool.query('select * from pacientes');
    res.json(response.rows);
}
const getPacientesM = async (req, res) => {
    const man = 'M';
    const response = await pool.query('select * from pacientes where sexo = $1', [man]);
    res.json(response.rows);
}
const getPacientesF = async (req, res) => {
    const woman = 'F';
    const response = await pool.query('select * from pacientes where sexo = $1', [woman]);
    res.json(response.rows);
}

module.exports = {
    getPacientes,
    getPacientesM,
    getPacientesF
}