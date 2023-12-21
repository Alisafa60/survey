const assert = require('assert');
const path = require('path');
const supertest = require('supertest');
const app = require('../index');
const jwt = require("jsonwebtoken");

describe('Image Controller', () => {
  it('should upload an image', async function () {
    this.timeout(10000); 

    
    const loginResponse = await supertest(app)
      .post('/auth/login')
      .send({
        username: 'hamza', 
        password: 'aliali', 
      });

    const token = loginResponse.body.token;

    const decodedToken = jwt.decode(token); 
    const userId = decodedToken.user_id;

    const imagePath = path.resolve(__dirname, './test-img.jpg');

    const response = await supertest(app)
      .post(`/api/users/${userId}/profile-picture`)
      .attach('profilePicture', imagePath)
      .set('Authorization', `Bearer ${token}`); 

    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.body.message, 'Profile picture uploaded successfully');
    assert.strictEqual(typeof response.body.imageUrl, 'string');
  });
});
