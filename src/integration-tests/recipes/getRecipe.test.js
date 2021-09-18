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
let recipe;

describe('GetRecipe Endpoint tests.', () => {
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

  it('Should return 200 when Authorization header is missing', async () => {
    request(app)
    .get(`/recipes/${recipe._id}`)
    .end((err, res) => {
      if (err) {
          console.error(err);
      }

      expect(res).to.have.status(200);
    });
  });

  it('Should return 200 when Authorization header is present', async () => {
    request(app)
    .get(`/recipes/${recipe._id}`)
    .set('Authorization', token)
    .end((err, res) => {
      if (err) {
          console.error(err);
      }

      expect(res).to.have.status(200);
    });
  });

  it('Should return 404 when no recipe is found', async () => {
    request(app)
    .get(`/recipes/999`)
    .end((err, res) => {
      if (err) {
          console.error(err);
      }

      expect(res).to.have.status(404);
    });
  });
});