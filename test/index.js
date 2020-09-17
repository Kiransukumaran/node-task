const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

// User Tests
describe('User', () => {
    describe('/GET user', () => {
        it('result will be the list of all users', (done) => {
            chai.request(server)
                .get('/user')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('users');
                    res.body.should.have.property('users').should.be.a("object");
                    res.body.should.be.a("object");
                    done();
                });
        });
    });

    describe('/GET user with id', () => {
        it('it should GET details of a user', (done) => {
            chai.request(server)
                .get('/user/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('user');
                    res.body.user.should.have.property('id');
                    res.body.user.id.should.be.eq(1);
                    done();
                });
        });
    });

    describe('/GET user with id which is not available', () => {
        it('try to get the user which is not available', (done) => {
            chai.request(server)
                .get('/user/6')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('user');
                    res.body.user.should.have.property('message');
                    res.body.user.message.should.be.eq("No user found!");
                    done();
                });
        });
    });

    describe('/GET user with id which is invalid', () => {
        it('it should GET details of an invalid user', (done) => {
            chai.request(server)
                .get('/user/6a')
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.be.eq("Invalid or No user id");
                    done();
                });
        });
    });

});
