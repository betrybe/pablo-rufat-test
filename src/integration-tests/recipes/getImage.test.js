const mongoose = require('mongoose');
const { CONNECTION_ERROR, MONGO_DB_URL} = require('../../api/utils/constants');
const { User, Recipe } = require("../../api/model");

describe('GetImage Endpoint tests.', () => {
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

  it('Should return 200 and an image', async () => {

  });
});