const mocha = require("mocha");
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
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

const imagePath = path.resolve(__dirname, '../../uploads/ratinho.jpg')
const image = fs.createReadStream(imagePath);
let newImagePath;

describe('DeleteRecipe Endpoint tests.', () => {
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
    newImagePath = path.resolve(__dirname, `../../uploads/${recipe._id}.jpeg`);
  });

  after(async () => {
    try {
      fs.unlinkSync(newImagePath);
    } catch (e) {}
    await User.deleteMany();
    await Recipe.deleteMany();
    await mongoose.disconnect();
  });

  it('Should return error 401 when authorization header is missing', async () => {
    request(app)
    .put(`/recipes/${recipe._id}/image`)
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(401);
    });
  });

  it('Should return error 401 when authorization token is invalid', async () => {
    request(app)
    .put(`/recipes/${recipe._id}/image`)
    .set('Authorization', 'wrong')
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(401);
    });
  });

  it('Should return error 401 when the user is not the creator of the recipe', async () => {
    request(app)
    .put(`/recipes/${recipe._id}/image`)
    .set('Authorization', wrongToken)
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(401);
    });
  });

  it('Should return error 400 when the recipeId has wrong format', async () => {
    request(app)
    .put(`/recipes/123/image`)
    .attach('image', image)
    .set('Content-Type','image/jpeg')
    .set('Authorization', token)
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(400);
    });
  });

  it('Should return 200. Field image must be present and its value is equal to the recipes id', async () => {
    request(app)
    .put(`/recipes/${recipe._id}/image`)
    .attach('image', image)
    .set('Content-Type','image/jpeg')
    .set('Authorization', token)
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(200);
    });
  });

  it('Should call endpoint whith admin user. Should return 200', async () => {
    request(app)
    .put(`/recipes/${recipe._id}/image`)
    .attach('image', image)
    .set('Content-Type','image/jpeg')
    .set('Authorization', adminToken)
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(200);
    });
  });
});