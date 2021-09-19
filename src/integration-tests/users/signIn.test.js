const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../api/app');
const { CONNECTION_ERROR, MONGO_DB_URL} = require('../../api/utils/constants');
const { User } = require('../../api/model');

chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

describe('SignIn Endpoint tests.', () => {
  before(async () => {
    await mongoose.connect(MONGO_DB_URL)
    .catch((error) => {
        console.error(CONNECTION_ERROR, error);
        process.exit(1);
    });

    await request(app)
    .post('/users')
    .send({
        name: "name",
        email: "test3@test.com",
        password: "1234567890",
    });
  });

  after(async () => {
    await User.deleteMany();
    await mongoose.disconnect();
  });

  it('Should return error 401 when field email is missing', async () => {
    request(app)
    .post('/login')
    .send({
        password: "1234567890",
    })
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(401);
    });
  });

  it('Should return error 401 when field email is invalid', async () => {
    request(app)
    .post('/login')
    .send({
        email: "test3",
        password: "1234567890",
    })
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(401);
    });
  });

  it('Should return error 401 when field password is missing', async () => {
    request(app)
    .post('/login')
    .send({
        email: "test3@test.com",
    })
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(401);
    });
  });

  it('Should return error 401 when field password is invalid', async () => {
    request(app)
    .post('/login')
    .send({
        email: "test3@test.com",
        password: "12"
    })
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(401);
    });
  });

  it('Should return 200 and the field token must be returned', async () => {
    request(app)
    .post('/login')
    .send({
        email: "test3@test.com",
        password: "1234567890"
    })
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(200);
        expect(res.body).to.haveOwnProperty('token');
    });
  });
});