const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../api/app');
const { CONNECTION_ERROR, MONGO_DB_URL} = require('../../api/utils/constants');
const { User, Recipe } = require("../../api/model");
const { Roles } = require('../../api/utils/interfaces');

chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

let token;
let recipe;
const imagePath = path.resolve(__dirname, '../../uploads/ratinho.jpg');
const image = fs.createReadStream(imagePath);
let newImagePath;

describe('GetImage Endpoint tests.', () => {
  before(async () => {
    await mongoose.connect(MONGO_DB_URL)
    .catch((error) => {
        console.error(CONNECTION_ERROR, error);
        process.exit(1);
    });
    
    const user = await User.create({ name: "name", email: "test3@test.com", password: "1234567890", role: Roles.USER });
    recipe = await Recipe.create({ name: "name", ingredients: "ingredients", preparation: "preparations", userId: user._id, image: null });

    const loginResponse = await request(app)
    .post('/login')
    .send({
        email: "test3@test.com",
        password: "1234567890"
    });

    token = loginResponse.body.token;

    await request(app)
    .put(`/recipes/${recipe._id}/image`)
    .attach('image', image)
    .set('Content-Type','image/jpeg')
    .set('Authorization', token);

    newImagePath = path.resolve(__dirname, `../../uploads/${recipe._id}.jpeg`);
  });

  after(async () => {
    fs.unlinkSync(newImagePath);
    await User.deleteMany();
    await Recipe.deleteMany();
    await mongoose.disconnect();
  });

  it('Should return 200 and image must exists', async () => {
    request(app)
    .get(`/images/${recipe._id}.jpeg`)
    .end((err, res) => {
      if (err) {
          console.error(err);
      }

      expect(fs.existsSync(newImagePath)).to.be.true;
      expect(res).to.have.status(200);
    });
  });
});