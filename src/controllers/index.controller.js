const { Pool } = require('pg'); // Conjunto de peticiones para Postgres
const jwt = require('jsonwebtoken');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'narinocovidapi',
    port: '5432'
})

const login = async(req, res) => {
    const {user, password} = req.body;
    const auxuser = await pool.query('select * from users where user = $1', [user]);
    if(!auxuser) return res.status(401).send('No existe el usuario');
    if (auxuser.password !== password) return res.status(401).send('Password incorrecto');
    res.send('Bienvenido');
    const token = jwt.sign({_id: user._id})

}
const getPacientes = async (req, res) => {
    const response = await pool.query('select * from pacientes');
    res.json(response.rows);
}
const getPacientesM = async (req, res) => {
    const sexo = req.query.sexo;
    const response = await pool.query('select * from pacientes where sexo = $1', [sexo]);
    res.json(response);
}
const getPacientesF = async (req, res) => {
    const woman = 'F';
    const response = await pool.query('select * from pacientes where sexo = $1', [woman]);
    res.json(response.rows);
}

module.exports = {
    getPacientes,
    getPacientesM,
    getPacientesF,
    login
}