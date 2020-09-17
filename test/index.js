let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
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
                    done();
                });
        });
    });

});
