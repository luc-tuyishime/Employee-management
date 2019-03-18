# EPIC-Mail-3 [![Maintainability](https://api.codeclimate.com/v1/badges/7b898310e8a3aac9455e/maintainability)](https://codeclimate.com/github/luc-tuyishime/EPIC-Mail-3/maintainability)
A web app that helps people exchange messages / information over the internet

## User Interface (UI)
* HTML
* CSS
* Javascript

### UI Link Example
[EPIC EMAIL link](https://luc-tuyishime.github.io/EPIC-Email/ui/)

## API ENDPOINTS

| Ressource URL | Methods  | Description  |
| ------- | --- | --- |
| / | GET | The index (welcome message) |
| /api/v2/users/register | POST | Register a new User |
| /api/v2/users/login | POST | Login registered User |
| /api/v2/messages/<userId> | POST | Send messages to a User |
| /api/v2/messages | GET | GET all messages for a User |
| /api/v2/messages/<userId> | GET | Get a specific message for a User |
| /api/v2/messages/sent | GET | GET all sent email for user |
| /api/v2/messages/drafts | POST | Save a draft email |
| /api/v2/messages/drafts/<messageId> | DELETE | Delete a draft email |
| /api/v2/groups | POST | Create and own a Group |
| /api/v2/groups | GET | Get all groups for a user |
| /api/v2/groups/<groupId> | DELETE | Delete a group i own |
| /api/v2/messages/groups/<groupId> | POST | Send email to a Group |
| /api/v2/messages/groups/<groupId> | GET | Get emails for a specific Group |
| /api/v2/groups/<groupId> | PATCH | Edit name of a specific Group |

## Tools Used

### Language
```
*Javascript*
```
### Server Environment
```
 *NodeJS* (run time Environment for running JS codes)
 ```
### Framework
```
 *Express* (used for building fast APIs)
 ```
### Testing Framework
```
 *Mocha* and *Chai*
 ```
### Style Guide
```
*Airbnb*
```
### Continuous Integration
```
Travis CI
```
### Test Coverage
```
nyc
```
### Git badge
```
coveralls
```
### Deployment
```
Heroku
```
### Heroku link Example

[EPIC Email link](https://epicmail3.herokuapp.com/)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites
To install the software on your local machine, you need first to clone the repository or download the zip file and once this is set up you are going to need this packages. [NodeJS]

```
 - NodeJs
 - Postgres
```

## Installing
The installation of this application is fairly straightforward, After cloning this repository to your local machine,CD into the package folder using your terminal and run the following

```
> Clone the repository
> Copy the .env to a .env then correct changes to the corresponding variables
> Run [ npm install ] to install node packages
> Run [ npm start ] to start the web app
```

It will install the node_modules which will help you run the project on your local machine.

## Run the test
```
> npm test
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
* PG_PORT = 

**Version 1.0.0**

## Contributor
- Jean luc Tuyishime <luctunechi45@gmail.com>

---

## License & copyright
Copyright (c) Jean luc Tuyishime, Software developer
