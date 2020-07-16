CREATE DATABASE narinocovidapi;

CREATE TABLE pacientes(
    id SERIAL PRIMARY KEY,
    fecha_notif date,
    ciu_ubic varchar(50),
    depto varchar(50),
    edad integer,
    sexo char(1),
    tipo varchar(50),
    estado varchar(50)
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    usuario varchar(50),
    contraseña varchar(255)
);

\copy pacientes from 'D:\Universidad\Once Semestre\Avanzada II\1.Proyecto Final\Casos_COVID-19-Narino.csv' delimiter ',' CSV HEADER;