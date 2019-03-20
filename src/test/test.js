import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.should();
chai.expect();
chai.use(chaiHttp);

let token = '';


  describe('Homepage', () => {
    it('it should open the homepage', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('User', () => {
    it('it should register a new user', (done) => {
      chai.request(server)
        .post('/api/v2/users/register')
        .send({
          email: 'angess@gmail.com',
          firstname: 'trewer',
          lastname: 'qwaszxdc',
          password: 'tuyishime'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          token = res.body.data[0].token;
          done();
        });
    });

    it('it should not register a new user with empty field', (done) => {
      chai.request(server)
        .post('/api/v2/users/register')
        .send({
          email: '',
          firstname: 'braneck',
          lastname: 'bgombele',
          password: 'qwerty'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });


    describe('Login a user with data already in the database', () => {
      it('it should login the user', (done) => {
        chai.request(server)
          .post('/api/v2/users/login')
          .send({
            email: 'angess@gmail.com',
            password: 'tuyishime',
          })

          .end((err, res) => {
            console.log(res.body);
            res.should.have.status(200);
            res.body.should.be.a('object');
            token = res.body.data[0].token;
            done();
          });
      });

      it('it should not register a new user with existing email', (done) => {
        chai.request(server)
          .post('/api/v2/users/register')
          .send({
            email: 'angess@gmail.com',
            firstname: 'Niyongabo',
            lastname: 'Arsene',
            password: '1234'
          })

          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
          });
      });
    });


    describe('Send a message to a user', () => {
      it('it should not send a message to a user that not exist', (done) => {
        chai.request(server)
          .post('/api/v2/messages/140')
          .set('x-access-token', token)
          .send({
            subject: 'bienvenue',
            message: 'viens ici on est a la maison',
            status: 'sent'
          })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
          });
      });
    });

    describe('GET messages for a user', () => {
        it('it should not get messages for a user that doesn\t exist', (done) => {
          chai.request(server)
            .get('/api/v2/messages')
            .set('x-access-token', token)
            .end((err, res) => {
              res.should.have.status(204);
              res.body.should.be.a('object');
              done();
            });
        });
      });

      describe('GET a particular messages for a user', () => {
          it('it should not get a particular messages for a user', (done) => {
            chai.request(server)
              .get('/api/v2/messages/1')
              .set('x-access-token', token)
              .end((err, res) => {
                res.should.have.status(204);
                res.body.should.be.a('object');
                done();
              });
          });
       });

       describe('CREATE draft', () => {
         it('it should not create draft', (done) => {
           chai.request(server)
             .post('/api/v2/messages/drafts')
             .send({
               subject: '',
               message: 'viens ici on est a la maison',
               status: 'draft'
             })
             .set('x-access-token', token)
             .end((err, res) => {
               res.should.have.status(400);
               res.body.should.be.a('object');
               done();
             });
         });
      });

      describe('Delete a draft', () => {
         it('it should not delete a specific draft with invalid parameter', (done) => {
           chai.request(server)
             .delete('/api/v2/messages/drafts/89')
             .set('x-access-token', token)
             .end((err, res) => {
               res.should.have.status(204);
               res.body.should.be.a('object');
               done();
             });
         });
       });
     describe('Get a group for a user', () => {
        it('it should not get a group for a user who did not create one', (done) => {
          chai.request(server)
            .get('/api/v2/groups')
            .set('x-access-token', token)
            .end((err, res) => {
              res.should.have.status(204);
              res.body.should.be.a('object');
              done();
            });
        });
      });
    describe('Delete a group', () => {
       it('it should not delete a group that doesn\t exist', (done) => {
         chai.request(server)
           .delete('/api/v2/groups/4234')
           .set('x-access-token', token)
           .end((err, res) => {
             res.should.have.status(204);
             res.body.should.be.a('object');
             done();
           });
       });
     });
  });
