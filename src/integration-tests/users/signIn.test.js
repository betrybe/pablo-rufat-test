const mongoose = require('mongoose');
const { CONNECTION_ERROR, MONGO_DB_URL} = require('../../api/utils/constants');
const { User } = require("../../api/model");

describe('SignIn Endpoint tests.', () => {
  before(async () => {
    await mongoose.connect(MONGO_DB_URL)
    .catch((error) => {
        console.error(CONNECTION_ERROR, error);
        process.exit(1);
    });
  });

  beforeEach(async () => {
    await User.deleteMany();
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('Should return error 401 when field email is missing', async () => {

  });

  it('Should return error 401 when field email is invalid', async () => {

  });

  it('Should return error 401 when field password is missing', async () => {

  });

  it('Should return error 401 when field password is invalid', async () => {

  });

  it('Should return 200 and the field token must be returned', async () => {

  });
});