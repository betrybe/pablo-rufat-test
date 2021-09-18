const mocha = require("mocha");
const mongoose = require('mongoose');
const { CONNECTION_ERROR, MONGO_DB_URL} = require('../../api/utils/constants');
const { User, Recipe } = require("../../api/model");

describe('DeleteRecipe Endpoint tests.', () => {
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

  it('Should return error 401 when authorization header is missing', async () => {

  });

  it('Should return error 401 when authorization token is invalid', async () => {

  });

  it('Should return error 401 when the user is not the creator of the recipe', async () => {

  });

  it('Should return 200. Field image must be present and its value is equal to the recipes id', async () => {

  });

  it('Should call endpoint whith admin user. Should return 200', async () => {

  });
});