import { StatusCodes } from 'http-status-codes';
import { post, del } from 'superagent';
import chai = require('chai');
import chaiSubset = require('chai-subset');
import { randomUUID } from 'crypto';
import { env } from '../../config/config';

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
const url = env.baseUrl;
const username = randomUUID();
const name = username.slice(0, 8);
const password = randomUUID().slice(0, 8);

describe('Delete a created user', () => {
  it('Delete user by id', async () => {
    customerTemplate.name = name;
    customerTemplate.username = username;

    const created = await post(`${url}/customer/`).send(customerTemplate);
    expect(created.status).to.equal(StatusCodes.CREATED);

    const { customerId } = created.body;
    customerTemplate.password = password;

    const updatedCustomer = await del(`${url}/customer/${customerId}`);
    customerTemplate.customerId = customerId;
    expect(updatedCustomer.status).to.equal(StatusCodes.NO_CONTENT);
  })
  it('Delete non-existent customer', async() => {
    try{
      await del(`${url}/customer/-1`);
    }catch(error){
      expect(error.status).to.equal(StatusCodes.NOT_FOUND);
      expect(error.response.body).to.containSubset({
        "errorMessage": "Unable to delete. Customer with id -1 not found."
    });
    }
  });
  it('Delete all user',async () => {
    const allDeleted = await del(`${url}/customer/`);
    expect(allDeleted.status).to.equal(StatusCodes.NO_CONTENT);
  })
});