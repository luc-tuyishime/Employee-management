


# Employee Management

A web APIs that helps to manage employees.


### Heroku API
[EPIC Email link](https://epicmail3.herokuapp.com/)

## Tools Used

[Javascript](https://javascript.info/) : Language used.

[NodeJS](https://nodejs.org/en/) : server environment.

[Express](http://expressjs.com/) : used for building fast APIs.


[Heroku](https://www.heroku.com/) : Deployment.


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites
TO setup the project on your local machine do the following
Install Node
```
npm install node
```
Install Postgres
```
[Postgres](http://www.postgresqltutorial.com/install-postgresql/)
```

Clone the repo by running

```
git clone https://github.com/luc-tuyishime/EPIC-Mail-3.git
cd EPIC-Mail-3
```

Then install all the necessary dependencies

```
npm install
```

## Database setup

```
Creata a .env file

Copy and Paste the DATABASE_URL

DATABASE_URL=postgres://[USERNAME]:[PASSWORD]@localhost/[DATABASE_NAME]
```

## Deployment

* URL = http://localhost:8000
* PORT = 8000
* NODE_ENV = production
* DATABASE_URL =
* PG_HOST = localhost
* PG_USER = username
* PG_DATABASE = management
* PG_PASSWORD = secretpassword
* PG_PORT = 5432


## Run the application

```
npm start

```

## Run tests

```
npm test
```

## API ENDPOINTS

| Ressource URL | Methods  | Description  |
| ------- | --- | --- |
| / | GET | The index (welcome message) |
| /api/v2/employees | POST | Create an employee |
| /api/v2/users/register | POST | Register a manager |
| /api/v2/users/register | POST | Login a manager |
| api/v2/employee/:id | PATCH | Edit en employee |
| api/v2/employee/:id | DELETE | Delete an employee |
| api/v2/employees/:id/activate | PATCH | Activate an employee |
| api/v2/employees/:id/suspend | PATCH | Suspend an employee |
| api/v2/employees | GET | Get all employees |
| api/v2/employees/search?name=frank | GET | Search employee with Name |


## Contributor
- Jean luc Tuyishime <luctunechi45@gmail.com>

---

## License & copyright
Copyright (c) Jean luc Tuyishime, Software developer
