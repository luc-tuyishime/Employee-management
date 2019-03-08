import pool from './connect';


export const tablesCreate = () => {
  const users = `CREATE TABLE IF NOT EXISTS
     users(
       id SERIAL PRIMARY KEY,
       "email" VARCHAR(50) NOT NULL,
       "firstName" VARCHAR(24) NOT NULL,
       "lastName" VARCHAR(10) NOT NULL,
        password TEXT NOT NULL,
       "isAdmin" BOOLEAN NOT NULL DEFAULT false
     )`;

     const contacts = `CREATE TABLE IF NOT EXISTS
      contacts(
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) NOT NULL,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL
      )`;

      const groups = `CREATE TABLE IF NOT EXISTS
      groups(
        id SERIAL PRIMARY KEY,
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
         contacts INT NOT NULL REFERENCES contacts(id) ON DELETE CASCADE ON UPDATE CASCADE,
         groups INT NOT NULL REFERENCES groups(id) ON DELETE CASCADE ON UPDATE CASCADE
        )`;

      const groupMember = `CREATE TABLE IF NOT EXISTS
      groupMember(
        id SERIAL PRIMARY KEY,
        groups INT NOT NULL REFERENCES groups(id) ON DELETE CASCADE ON UPDATE CASCADE
      )`;

  const newUserTable = `INSERT INTO
  users(
    "email",
    "firstName",
    "lastName",
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
