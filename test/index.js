const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

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
                    res.body.error.should.be.eq("Validation failed");
                    done();
                });
        });
    });

});

describe('Login', () => {
    describe('/POST auth/login', () => {
        it('returns a token if login successful', (done) => {
            const credentials = {
                username: "arun",
                password: "testpassword"
            }
            chai.request(server)
                .post('/auth/login')
                .send(credentials)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message');
                    res.body.message.should.be.eq("User logged in");
                    res.body.should.have.property('token');
                    res.body.token.should.be.a('string');
                    done();
                });
        });
    });

    describe('/POST auth/login with invalid password', () => {
        it('return invalid credentials', (done) => {
            const credentials = {
                username: "arun",
                password: "wrongpassword"
            }
            chai.request(server)
                .post('/auth/login')
                .send(credentials)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property('message');
                    res.body.message.should.be.eq("Invalid credentials");
                    done();
                });
        });
    });

    describe('/POST auth/login with invalid username', () => {
        it('return no user', (done) => {
            const credentials = {
                username: "wrongname",
                password: "testpassword"
            }
            chai.request(server)
                .post('/auth/login')
                .send(credentials)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('message');
                    res.body.message.should.be.eq("No User");
                    done();
                });
        });
    });

    describe('/POST auth/login with no username or password', () => {
        it('return validation failed', (done) => {
            const credentials = {
                username: "arun",
            }
            chai.request(server)
                .post('/auth/login')
                .send(credentials)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.have.property('error');
                    res.body.error.should.be.eq("Validation failed");
                    done();
                });
        });
    });

});

describe('Profile', () => {

    describe('/GET auth/profile', () => {
        it('it should GET profile of a user', (done) => {
            const credentials = {
                username: "arun",
                password: "testpassword"
            }
            chai.request(server)
                .post("/auth/login")
                .send(credentials)
                .end((err, res) => {
                    chai.request(server)
                        .get('/auth/profile')
                        .set({ Authorization: `Bearer ${res.body.token}` })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('profile');
                            res.body.profile.should.have.property('id');
                            res.body.profile.id.should.be.eq(1);
                            done();
                        });
                })

        });
    });

    describe('/GET auth/profile with invalid token', () => {
        it('it should return error due to invalid token', (done) => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAwMzUxODEzLCJleHAiOjE2MDAzNTE4MTh9.ugHl5YZku8V7U6F-R7KII7KInVbQ1IBb_k7MUkk__Z0";
            chai.request(server)
                .get('/auth/profile')
                .set({ Authorization: `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });

});

