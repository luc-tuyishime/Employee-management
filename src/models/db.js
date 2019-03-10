import pool from './connect';


export const tablesCreate = () => {
  const users = `CREATE TABLE IF NOT EXISTS
     users(
       id SERIAL PRIMARY KEY,
       email VARCHAR(50) UNIQUE NOT NULL,
       firstname VARCHAR(24) NOT NULL,
       lastname VARCHAR(10) NOT NULL,
       password VARCHAR(80) NOT NULL
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
         subject VARCHAR(1000) NOT NULL,
         message VARCHAR (1000) NOT NULL,
         parentMessageId UUID NOT NULL,
         status VARCHAR (50)  NOT NULL,
         sender_id SERIAL NOT NULL,
         receiverId SERIAL,
         createdOn TIMESTAMP,
         FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
        )`;

        const drafts = `CREATE TABLE IF NOT EXISTS
          drafts(
           id SERIAL PRIMARY KEY,
           subject VARCHAR(1000) NOT NULL,
           message VARCHAR (1000) NOT NULL,
           parentMessageId UUID NOT NULL,
           status VARCHAR (50)  NOT NULL,
           sender_id SERIAL NOT NULL,
           receiverId SERIAL,
           createdOn TIMESTAMP,
           FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
          )`;

      const groupMember = `CREATE TABLE IF NOT EXISTS
      groupMember(
        id SERIAL PRIMARY KEY,
        owner_id INT NOT NULL,
        FOREIGN KEY (owner_id) REFERENCES groups(id_group) ON DELETE CASCADE
      )`;



  const queries = `${users}; ${contacts}; ${groups}; ${messages}; ${drafts}; ${groupMember}`;

  pool.query(queries);
};

export const tablesDelete = () => {
  const users = 'DROP TABLE IF EXISTS users CASCADE';
  const contacts = 'DROP TABLE IF EXISTS contacts CASCADE';
  const message = 'DROP TABLE IF EXISTS messages';
  const draft = 'DROP TABLE IF EXISTS drafts';
  const group = 'DROP TABLE IF EXISTS groups CASCADE';
  const groupMember = 'DROP TABLE IF EXISTS groupMember';
  const deleteQueries = `${users}; ${contacts}; ${group}; ${message}; ${draft}; ${groupMember}`;
  pool.query(deleteQueries);
};


require('make-runnable');
