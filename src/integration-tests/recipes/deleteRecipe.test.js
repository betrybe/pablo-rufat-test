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
let user;
let wrongToken;
let adminToken;
let recipe;

describe('DeleteRecipe Endpoint tests.', () => {
  before(async () => {
    await mongoose.connect(MONGO_DB_URL)
    .catch((error) => {
        console.error(CONNECTION_ERROR, error);
        process.exit(1);
    });

    user = await User.create({ name: "name", email: "test3@test.com", password: "1234567890" });
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
    .delete(`/recipes/${recipe._id}`)
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(401);
    });
  });

  it('Should return error 401 when authorization token is invalid', async () => {
    request(app)
    .delete(`/recipes/${recipe._id}`)
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
    .delete(`/recipes/${recipe._id}`)
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
    .delete(`/recipes/123`)
    .set('Authorization', token)
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(400);
    });
  });

  it('Should return 204', async () => {
    request(app)
    .delete(`/recipes/${recipe._id}`)
    .set('Authorization', token)
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }

        expect(res).to.have.status(204);
    });
  });

  it('Should call endpoint whith admin user. Should return 204', async () => {
    
    newRecipe = await Recipe.create({ name: "new name", ingredients: "ingredients", preparation: "preparations", userId: user._id, image: null });

     request(app)
     .delete(`/recipes/${newRecipe._id}`)
     .set('Authorization', adminToken)
     .end(function(err, res) {
         if (err) {
             console.error(err);
         }
 
         expect(res).to.have.status(204);
     });

  });
});