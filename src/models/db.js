import pool from './connect';


export const tablesCreate = () => {
  const employees = `CREATE TABLE IF NOT EXISTS
     employees(
       id SERIAL PRIMARY KEY,
       name VARCHAR(40) NOT NULL,
       nationalId VARCHAR(80) NOT NULL,
       phone VARCHAR(60) NOT NULL,
       email VARCHAR(50) UNIQUE NOT NULL,
       birth DATE,
       status VARCHAR(10) NOT NULL,
       position VARCHAR(80) NOT NULL,
       password VARCHAR(80) NOT NULL
     )`;





  const queries = `${employees};`;

  pool.query(queries);
};

export const tablesDelete = () => {
  const employees = 'DROP TABLE IF EXISTS employees CASCADE';
  const deleteQueries = `${employees};`;
  pool.query(deleteQueries);
};


require('make-runnable');
