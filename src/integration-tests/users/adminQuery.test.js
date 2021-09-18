const mongoose = require('mongoose');
const { CONNECTION_ERROR, MONGO_DB_URL} = require('../../api/utils/constants');
const { User } = require("../../api/model");

describe('Admin query tests.', () => {
  before(async () => {
    await mongoose.connect(MONGO_DB_URL)
    .catch((error) => {
        console.error(CONNECTION_ERROR, error);
        process.exit(1);
    });
    
    await User.deleteMany();
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('Should exist seed.js file. Should have an insert command', async () => {

  });

  it('Should insert an admin user when the script is called', async () => {
      
  });

  it('Should login with the new admin user', async () => {
      
  });
});