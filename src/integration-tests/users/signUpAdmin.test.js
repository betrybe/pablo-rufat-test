const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../api/app');
const { CONNECTION_ERROR, MONGO_DB_URL} = require('../../api/utils/constants');
const { User } = require("../../api/model");
const { Roles } = require('../../api/utils/interfaces');

chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

let token;

describe('SignUp Endpoint tests.', () => {
    before(async () => {
        await mongoose.connect(MONGO_DB_URL)
        .catch((error) => {
            console.error(CONNECTION_ERROR, error);
            process.exit(1);
        });
        

        await User.create({ name: "admin", email: "admin@test.com", password: "1234567890", role: 'admin' });

        const loginResponse = await request(app)
        .post('/login')
        .send({
            email: "admin@test.com",
            password: "1234567890"
        });

        token = loginResponse.body.token;
    });

    beforeEach(async () => {
        await User.deleteMany();
    });

    after(async () => {
        await User.deleteMany();
        await mongoose.disconnect();
    });

    it('Should return error 400 when field name is missing', async () => {
        request(app)
        .post('/users/admin')
        .set('Authorization', token)
        .send({
            email: "admin@test.com",
            password: "1234567890"
        })
        .end(function(err, res) {
            if (err) {
                console.error(err);
            }

            expect(res).to.have.status(400);
        });
    });

    it('Should return error 400 when field email is missing', async () => {
        request(app)
        .post('/users/admin')
        .set('Authorization', token)
        .send({
            name: "admin",
            password: "1234567890"
        })
        .end(function(err, res) {
            if (err) {
                console.error(err);
            }

            expect(res).to.have.status(400);
        });
    });

    it('Should return error 400 when field email is invalid', async () => {
        request(app)
        .post('/users/admin')
        .set('Authorization', token)
        .send({
            name: "name",
            email: "admin",
            password: "1234567890"
        })
        .end(function(err, res) {
            if (err) {
                console.error(err);
            }

            expect(res).to.have.status(400);
        });
    });

    it('Should return error 400 when field password is missing', async () => {
        request(app)
        .post('/users/admin')
        .set('Authorization', token)
        .send({
            name: "name",
            email: "admin@test.com",
        })
        .end(function(err, res) {
            if (err) {
                console.error(err);
            }

            expect(res).to.have.status(400);
        });
    });

    it('Should return 201 and the field role value must be "admin"', async () => {
        request(app)
        .post('/users/admin')
        .set('Authorization', token)
        .send({
            name: "name",
            email: "admin2@test.com",
            password: "1234567890"
        })
        .end(function(err, res) {
            if (err) {
                console.error(err);
            }

            expect(res).to.have.status(201);
            expect(res.body).to.have.haveOwnProperty('user');
            expect(res.body.user.role).to.be.equal(Roles.ADMIN);
        });
    });
});