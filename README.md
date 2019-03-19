[![Build Status](https://travis-ci.org/luc-tuyishime/EPIC-Mail-3.svg?branch=develop)](https://travis-ci.org/luc-tuyishime/EPIC-Mail-3) [![Maintainability](https://api.codeclimate.com/v1/badges/7b898310e8a3aac9455e/maintainability)](https://codeclimate.com/github/luc-tuyishime/EPIC-Mail-3/maintainability)

# EPIC-Mail-3

A web app that helps people exchange messages / information over the internet

## User Interface (UI)
* HTML
* CSS
* Javascript

### Github Pages
[EPIC EMAIL link](https://luc-tuyishime.github.io/EPIC-Email/ui/)

### Heroku API
[EPIC Email link](https://epicmail3.herokuapp.com/)

## Tools Used

[Javascript](https://javascript.info/) : Language used.

[NodeJS](https://nodejs.org/en/) : server environment.

[Express](http://expressjs.com/) : used for building fast APIs.

[Mocha and Chai](https://www.youtube.com/watch?v=MLTRHc5dk6s) : Testing Framework.

[Airbnb](https://github.com/airbnb/javascript) : Style Guide.

[Travis](https://travis-ci.org/) : Continuous Integration.

[nyc](https://github.com/istanbuljs/nyc) : Test coverage.

[Coveralls](https://coveralls.io/) : Git badge.

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
* PG_DATABASE = epicemail
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
| /api/v2/users/register | POST | Register a new User |
| /api/v2/users/login | POST | Login registered User |
| /api/v2/messages/`userId` | POST | Send messages to a User |
| /api/v2/messages | GET | GET all messages for a User |
| /api/v2/messages/`<messageId>` | GET | Get a specific message for a User |
| /api/v2/messages/sent | GET | GET all sent email for user |
| /api/v2/messages/drafts | POST | Save a draft email |
| /api/v2/messages/drafts/`<messageId>` | DELETE | Delete a draft email |
| /api/v2/groups | POST | Create and own a Group |
| /api/v2/groups | GET | Get all groups for a user |
| /api/v2/groups/`<groupId>` | DELETE | Delete a group i own |
| /api/v2/messages/groups/`<groupId>` | POST | Send email to a Group |
| /api/v2/messages/groups/`<groupId>` | GET | Get emails for a specific Group |
| /api/v2/groups/`<groupId>` | PATCH | Edit name of a specific Group |


## Contributor
- Jean luc Tuyishime <luctunechi45@gmail.com>

---

## License & copyright
Copyright (c) Jean luc Tuyishime, Software developer
