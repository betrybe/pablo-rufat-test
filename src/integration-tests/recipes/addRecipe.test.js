const mongoose = require('mongoose');
const { CONNECTION_ERROR, MONGO_DB_URL} = require('../../api/utils/constants');
const { User, Recipe } = require("../../api/model");

describe('AddRecipe Endpoint tests.', () => {
  before(async () => {
    await mongoose.connect(MONGO_DB_URL)
    .catch((error) => {
        console.error(CONNECTION_ERROR, error);
        process.exit(1);
    });
  });

  beforeEach(async () => {
    await User.deleteMany();
    await Recipe.deleteMany();
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('Should return error 400 when field name is missing', async () => {

  });

  it('Should return error 400 when field ingredients is missing', async () => {

  });

  it('Should return error 400 when field preparation is missing', async () => {

  });

  it('Should return error 401 when authorization token is invalid', async () => {

  });

  it('Should return error 201 and fields name, ingredients, preparation, userId and _id must be present', async () => {

  });
});