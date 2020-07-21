const { Pool } = require('pg'); // Conjunto de peticiones para Postgres
const jwt = require('jsonwebtoken');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'narinocovidapi',
    port: '5432'
})

const JWT_SECRETKEY = 'asdfjeirjkdf';

const login = async(req, res) => {
    const {user, password} = req.body;
    const auxuser = await pool.query('select contrasena from usuarios where usuario = $1', [user]);
    if(!auxuser || auxuser.rows[0].contrasena !== password ) return res.status(403).send('Usuario o contraseña incorrectos');
    console.log('Bienvenido');
    const token = jwt.sign(user, JWT_SECRETKEY);
    res.send({
        signed_user: user,
        token: token
    });
}
const signup = async(req, res) => {
    const {user, email, password} = req.body;
    const newUser = await pool.query('insert into usuarios(usuario, email, contrasena) values ($1, $2, $3)',[user, email, password]);
    const token = jwt.sign(user, JWT_SECRETKEY);
    res.send({
        signed_user: user,
        token: token
    })
    
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
    login,
    signup
}