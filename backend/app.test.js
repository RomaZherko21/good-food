const request = require('supertest');

var app = require('./app').app;

describe('GET /products', function () {
  it('responds with json', function (done) {
    request(app)
      .get('/products?limit=3&offset=0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
describe('POST /customers', function () {
  it('responds with json', function (done) {
    request(app)
      .post('/customers/changeMetaData')
      .send({
        email: 'RomaZherko21@gmail.com',
        meta: JSON.stringify({
          name: 'Roma',
          surname: 'Zherko',
          country: 'Belarus',
        }),
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        200,
        {
          status: 200,
          message: 'Customer was updated!',
        },
        done
      );
  });
});
