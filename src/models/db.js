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

      const groups = `CREATE TABLE IF NOT EXISTS
      groups(
        id_group SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        role VARCHAR(50) NOT NULL,
        createdOn TIMESTAMP,
        owner__id SERIAL NOT NULL,
        FOREIGN KEY (owner__id) REFERENCES users(id) ON DELETE CASCADE
      )`;

      const messages = `CREATE TABLE IF NOT EXISTS
        messages(
         id SERIAL PRIMARY KEY,
         sender_id SERIAL NOT NULL,
         subject VARCHAR(1000) NOT NULL,
         message VARCHAR (1000) NOT NULL,
         parentMessageId UUID NOT NULL,
         status VARCHAR (50)  NOT NULL,
         receiverId SERIAL,
         createdOn TIMESTAMP,
         FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
        )`;

        const groupMessages = `CREATE TABLE IF NOT EXISTS
          groupMessages(
           id SERIAL PRIMARY KEY,
           sender_id SERIAL NOT NULL,
           subject VARCHAR(1000) NOT NULL,
           message VARCHAR (1000) NOT NULL,
           parentMessageId UUID NOT NULL,
           status VARCHAR (50)  NOT NULL,
           group_id SERIAL,
           createdOn TIMESTAMP,
           FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
           FOREIGN KEY (group_id) REFERENCES groups(id_group) ON DELETE CASCADE
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



  const queries = `${users}; ${groups}; ${messages}; ${groupMessages}; ${drafts}; ${groupMember}`;

  pool.query(queries);
};

export const tablesDelete = () => {
  const users = 'DROP TABLE IF EXISTS users CASCADE';
  const message = 'DROP TABLE IF EXISTS messages';
  const groupMessage = 'DROP TABLE IF EXISTS groupMessages';
  const draft = 'DROP TABLE IF EXISTS drafts';
  const group = 'DROP TABLE IF EXISTS groups CASCADE';
  const groupMember = 'DROP TABLE IF EXISTS groupMember';
  const deleteQueries = `${users}; ${group}; ${message}; ${groupMessage}; ${draft}; ${groupMember}`;
  pool.query(deleteQueries);
};


require('make-runnable');
