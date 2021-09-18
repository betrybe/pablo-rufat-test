const mongoose = require('mongoose');
const { CONNECTION_ERROR, MONGO_DB_URL} = require('../../api/utils/constants');
const { User } = require("../../api/model");

describe('SignUp Endpoint tests.', () => {
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

  it('Should return error 400 when field name is missing', async () => {

  });

  it('Should return error 400 when field email is missing', async () => {

  });

  it('Should return error 400 when field email is invalid', async () => {

  });

  it('Should return error 400 when field password is missing', async () => {

  });

  it('Should return error 409 when email already exists', async () => {

  });

  it('Should return 201 and the field role value must be "user"', async () => {

  });
});