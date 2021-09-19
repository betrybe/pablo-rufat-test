const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../api/app');
const { CONNECTION_ERROR, MONGO_DB_URL} = require('../../api/utils/constants');
const { User, Recipe } = require("../../api/model");

chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

let token;

describe('AddRecipe Endpoint tests.', () => {

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

    
    const loginResponse = await request(app)
    .post('/login')
    .send({
        email: "test3@test.com",
        password: "1234567890"
    });

    token = loginResponse.body.token;
  });

  beforeEach(async () => {
    await Recipe.deleteMany();
  });

  after(async () => {
    await User.deleteMany();
    await Recipe.deleteMany();
    await mongoose.disconnect();
  });

  it('Should return error 400 when field name is missing', async () => {
    request(app)
    .post('/recipes')
    .set('Authorization', token)
    .send({
        ingredients: "ingredients",
        preparation: "preparation",
    })
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(400);
    });
  });

  it('Should return error 400 when field ingredients is missing', async () => {
    request(app)
    .post('/recipes')
    .set('Authorization', token)
    .send({
        name: "name",
        preparation: "preparation",
    })
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(400);
    });
  });

  it('Should return error 400 when field preparation is missing', async () => {
    request(app)
    .post('/recipes')
    .set('Authorization', token)
    .send({
        ingredients: "ingredients",
        name: "name",
    })
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(400);
    });
  });

  it('Should return error 401 when authorization token is invalid', async () => {
    request(app)
    .post('/recipes')
    .set('Authorization', 'wrong')
    .send({
        name: "name",
        ingredients: "ingredients",
        preparation: "preparation",
    })
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(401);
    });
  });

  it('Should return error 201 and fields name, ingredients, preparation, userId and _id must be present', async () => {
    request(app)
    .post('/recipes')
    .set('Authorization', token)
    .send({
        name: "name",
        ingredients: "ingredients",
        preparation: "preparation",
    })
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(201);
        expect(res.body.recipe).to.haveOwnProperty('_id');
        expect(res.body.recipe).to.haveOwnProperty('name');
        expect(res.body.recipe).to.haveOwnProperty('ingredients');
        expect(res.body.recipe).to.haveOwnProperty('preparation');
        expect(res.body.recipe).to.haveOwnProperty('userId');
    });
  });
});