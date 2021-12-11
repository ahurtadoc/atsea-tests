import { StatusCodes } from 'http-status-codes';
import { post, put } from 'superagent';
import chai = require('chai');
import chaiSubset = require('chai-subset');
import { randomUUID } from 'crypto';

chai.use(chaiSubset);
const { expect } = chai;
const customerTemplate = {
  customerId: 0,
  name: "Sally Vallery",
  address: "144 Townsend, San Francisco 99999",
  email: "sally5@example.com",
  phone: "513 222 5555",
  username: 'sallyv',
  password: "sallypassword",
  enabled: true,
  role: "USER"
};
const url = 'http://localhost:8080/api';
const username = randomUUID();
const name = username.slice(0, 8);
const password = randomUUID().slice(0, 8);

describe('Update a created user', () => {
  it('Change password user', async () => {
    customerTemplate.name = name;
    customerTemplate.username = username;

    const created = await post(`${url}/customer/`).send(customerTemplate);
    expect(created.status).to.equal(StatusCodes.CREATED);

    const { customerId } = created.body;
    customerTemplate.password = password;

    const updatedCustomer = await put(`${url}/customer/${customerId}`).send(customerTemplate);
    customerTemplate.customerId = customerId;
    expect(updatedCustomer.status).to.equal(StatusCodes.OK);
    expect(updatedCustomer.body).to.containSubset(customerTemplate);
  })
  it('Update non-existent customer', async() => {
    try{
      await put(`${url}/customer/-1`).send(customerTemplate);
    }catch(error){
      expect(error.status).to.equal(StatusCodes.NOT_FOUND);
      expect(error.response.body).to.containSubset({
        "errorMessage": "Unable to upate. Customer with id -1 not found."
    });
    }
  });
});