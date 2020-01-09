import pool from './connect';


export const tablesCreate = () => {
  const managers = `CREATE TABLE IF NOT EXISTS
     managers(
       id SERIAL PRIMARY KEY,
       name VARCHAR(80) NOT NULL,
       nationalId VARCHAR(80) NOT NULL,
       phone VARCHAR(60) NOT NULL,
       email VARCHAR(50) UNIQUE NOT NULL,
       birth DATE,
       status VARCHAR(10) NOT NULL,
       position VARCHAR(80) NOT NULL,
       password VARCHAR(80) NOT NULL
     )`;

  const employees = `CREATE TABLE IF NOT EXISTS
      employees(
       id SERIAL PRIMARY KEY,
       name VARCHAR(80) NOT NULL,
       nationalId VARCHAR(80) NOT NULL,
       phone VARCHAR(60) NOT NULL,
       email VARCHAR(50) UNIQUE NOT NULL,
       birth DATE,
       status VARCHAR(10) NOT NULL,
       position VARCHAR(80) NOT NULL,
       managerId SERIAL NOT NULL,
       createdOn TIMESTAMP,
       FOREIGN KEY (managerId) REFERENCES managers(id) ON DELETE CASCADE
      )`;



  const queries = `${managers}; ${employees};`;

  pool.query(queries);
};

export const tablesDelete = () => {
  const employees = 'DROP TABLE IF EXISTS employees CASCADE';
  const managers = 'DROP TABLE IF EXISTS managers CASCADE';
  const deleteQueries = `${employees}; ${managers};`;
  pool.query(deleteQueries);
};


require('make-runnable');
