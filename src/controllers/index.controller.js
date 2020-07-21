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
    const auxuser = await pool.query('select usuario, email, contrasena from usuarios where usuario = $1', [user]);
    if(!auxuser || auxuser.rows[0].contrasena !== password ) return res.status(403).send('Usuario o contraseña incorrectos');
    console.log('Bienvenido');
    const token = jwt.sign(user, JWT_SECRETKEY);
    res.send({
        login_user: auxuser.rows[0].usuario,
        login_email: auxuser.rows[0].email,
        token: token
    });
}
const signup = async(req, res) => {
    const {user, email, password} = req.body;
    const newUser = await pool.query('insert into usuarios(usuario, email, contrasena) values ($1, $2, $3)',[user, email, password]);
    const token = jwt.sign(user, JWT_SECRETKEY);
    res.send({
        signed_user: user,
        signed_email: email,
        token: token
    })
    
}
const getPacientes = async (req, res) => {
    if (req.query.sexo){
        const pacientes = await pool.query('select * from pacientes where sexo = $1', [req.query.sexo]);
        return res.json(pacientes.rows);
    }
    if (req.query.edad){
        if (req.query.edad == 'infancia'){
            const minimo = 0;
            const maximo = 11;
            const pacientes = await pool.query('select * from pacientes where edad >= $1 and edad <= $2', [minimo, maximo]);
            return res.json(pacientes.rows);
        }
        if (req.query.edad == 'juventud'){
            const minimo = 12;
            const maximo = 26;
            const pacientes = await pool.query('select * from pacientes where edad >= $1 and edad <= $2', [minimo, maximo]);
            return res.json(pacientes.rows);
        }
        if (req.query.edad == 'adultez'){
            const minimo = 27;
            const maximo = 59;
            const pacientes = await pool.query('select * from pacientes where edad >= $1 and edad <= $2', [minimo, maximo]);
            return res.json(pacientes.rows);
        }
        if (req.query.edad == 'vejez'){
            const minimo = 60;
            const pacientes = await pool.query('select * from pacientes where edad >= $1', [minimo]);
            return res.json(pacientes.rows);
        }      
    }
    if (req.query.estado){
        const pacientes = await pool.query('select * from pacientes where estado = $1', [req.query.estado]);
        return res.json(pacientes.rows);
    }
    const response = await pool.query('select * from pacientes');
    res.json(response.rows);
}

module.exports = {
    getPacientes,
    login,
    signup
}