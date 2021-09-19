const mongoose = require('mongoose');
const fs = require('fs');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../api/app');
const { CONNECTION_ERROR, MONGO_DB_URL} = require('../../api/utils/constants');
const { User } = require("../../api/model");

chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

describe('Admin query tests.', () => {
  before(async () => {
    await mongoose.connect(MONGO_DB_URL)
    .catch((error) => {
        console.error(CONNECTION_ERROR, error);
        process.exit(1);
    });
    
    await User.deleteMany();
    await User.create({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
  });

  after(async () => {
    //await User.deleteMany();
    await mongoose.disconnect();
  });

  it('Should exist seed.js file. Should have an insert command', async () => {
    const file = fs.readFileSync('./seed.js', 'utf-8');
    expect(file).contain('db.users.insertOne({ name: \'admin\', email: \'root@email.com\', password: \'admin\', role: \'admin\' });');
  });

  it('Should login with the new admin user', async () => {
    request(app)
    .post('/login')
    .send({
        email: "root@email.com",
        password: "admin"
    })
    .end((err, res) => {
      if (err) {
          console.error(err);
      }

      expect(res).to.have.status(200);
      expect(res.body).to.haveOwnProperty('token');
    });
  });
});