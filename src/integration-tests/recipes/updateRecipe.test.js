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
let wrongToken;
let adminToken;
let recipe;

describe('UpdateRecipe Endpoint tests.', () => {
  before(async () => {
    await mongoose.connect(MONGO_DB_URL)
    .catch((error) => {
        console.error(CONNECTION_ERROR, error);
        process.exit(1);
    });

    await User.create({ name: "name", email: "test3@test.com", password: "1234567890" });
    await User.create({ name: "name 4", email: "test4@test.com", password: "1234567890" });
    await User.create({ name: "admin", email: "admin@test.com", password: "1234567890", role: 'admin' });

    const loginResponse = await request(app)
    .post('/login')
    .send({
        email: "test3@test.com",
        password: "1234567890"
    });

    token = loginResponse.body.token;

    const wrongLoginResponse = await request(app)
    .post('/login')
    .send({
        email: "test4@test.com",
        password: "1234567890"
    });

    wrongToken = wrongLoginResponse.body.token;

    const adminLoginResponse = await request(app)
    .post('/login')
    .send({
        email: "admin@test.com",
        password: "1234567890"
    });

    adminToken = adminLoginResponse.body.token;

   const addRecipeResponse = await request(app)
    .post('/recipes')
    .set('Authorization', token)
    .send({
        name: "name",
        ingredients: "ingredients",
        preparation: "preparation",
    });

    recipe = addRecipeResponse.body.recipe;
  });

  after(async () => {
    await User.deleteMany();
    await Recipe.deleteMany();
    await mongoose.disconnect();
  });

  it('Should return error 401 when authorization header is missing', async () => {
    request(app)
    .put(`/recipes/${recipe._id}`)
    .send({
        name: "name updated",
        ingredients: "ingredients updated",
        preparation: "preparation updated",
    })
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(401);
    });
  });

  it('Should return error 401 when authorization token is invalid', async () => {
    request(app)
    .put(`/recipes/${recipe._id}`)
    .set('Authorization', 'wrong')
    .send({
        name: "name updated",
        ingredients: "ingredients updated",
        preparation: "preparation updated",
    })
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(401);
    });
  });

  it('Should return error 401 when the user is not the creator of the recipe', async () => {
    request(app)
    .put(`/recipes/${recipe._id}`)
    .set('Authorization', wrongToken)
    .send({
        name: "name updated",
        ingredients: "ingredients updated",
        preparation: "preparation updated",
    })
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(401);
    });
  });

  it('Should return 200 and fields name, integration, preparation must be present and updated', async () => {
    request(app)
    .put(`/recipes/${recipe._id}`)
    .set('Authorization', token)
    .send({
        name: "name updated",
        ingredients: "ingredients updated",
        preparation: "preparation updated",
    })
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(200);
        expect(res.body.name).to.be.equal('name updated');
        expect(res.body.ingredients).to.be.equal('ingredients updated');
        expect(res.body.preparation).to.be.equal('preparation updated');
    });
  });

  it('Should call endpoint whith admin user. Should return 200', async () => {
    request(app)
    .put(`/recipes/${recipe._id}`)
    .set('Authorization', adminToken)
    .send({
        name: "name updated",
        ingredients: "ingredients updated",
        preparation: "preparation updated",
    })
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(200);
    });
  });
});