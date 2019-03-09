import pool from './connect';


export const tablesCreate = () => {
  const users = `CREATE TABLE IF NOT EXISTS
     users(
       id SERIAL PRIMARY KEY,
       email VARCHAR(50) UNIQUE NOT NULL,
       firstname VARCHAR(24) NOT NULL,
       lastname VARCHAR(10) NOT NULL,
       password VARCHAR(80) NOT NULL,
       "isAdmin" BOOLEAN NOT NULL DEFAULT false
     )`;

     const contacts = `CREATE TABLE IF NOT EXISTS
      contacts(
        id_contact SERIAL PRIMARY KEY,
        email VARCHAR(100) NOT NULL,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        createdOn TIMESTAMP,
        modifiedOn TIMESTAMP
      )`;

      const groups = `CREATE TABLE IF NOT EXISTS
      groups(
        id_group SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        role VARCHAR(50) NOT NULL
      )`;

      const messages = `CREATE TABLE IF NOT EXISTS
        messages(
         id SERIAL PRIMARY KEY,
         createdOn date,
         subject VARCHAR(1000) NOT NULL,
         message VARCHAR (1000) NOT NULL,
         parentMessageId INT NOT NULL,
         status VARCHAR (50)  NOT NULL,
         id_contact INT NOT NULL,
         id_group INT NOT NULL
        )`;

      const groupMember = `CREATE TABLE IF NOT EXISTS
      groupMember(
        id SERIAL PRIMARY KEY,
        id_group INT NOT NULL
      )`;

  const newUserTable = `INSERT INTO
  users(
    "email",
    "firstname",
    "lastname",
    "password",
    "isAdmin"
    ) VALUES (
    'luc@gmail.com',
    'luc',
    'tuyishime',
    '12345',
    true
    )`;

  const queries = `${users}; ${contacts}; ${groups}; ${messages}; ${groupMember}; ${newUserTable}`;

  pool.query(queries);
};

export const tablesDelete = () => {
  const users = 'DROP TABLE IF EXISTS users CASCADE';
  const contacts = 'DROP TABLE IF EXISTS contacts CASCADE';
  const message = 'DROP TABLE IF EXISTS messages';
  const group = 'DROP TABLE IF EXISTS groups CASCADE';
  const groupMember = 'DROP TABLE IF EXISTS groupMember';
  const deleteQueries = `${users}; ${contacts}; ${group}; ${message}; ${groupMember}`;
  pool.query(deleteQueries);
};


require('make-runnable');
