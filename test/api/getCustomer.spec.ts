import { StatusCodes } from 'http-status-codes';
import { post, get } from 'superagent';
import chai = require('chai');
import chaiSubset = require('chai-subset');
import { randomUUID } from 'crypto';
import { env } from '../../config/config';

chai.use(chaiSubset);
const { expect } = chai;
const customerTemplate = {
  customerId : 0,
  name       : "Sally Vallery",
  address    : "144 Townsend, San Francisco 99999",
  email      : "sally5@example.com",
  phone      : "513 222 5555",
  username   : 'sallyv',
  password   : "sallypassword",
  enabled    : "true",
  role       : "USER"
};

const url = env.baseUrl;
console.log(url);

const username = randomUUID();
const name = username.slice(0,8);

describe('Get a created user', () => {
  it('Get him by id', async () => {
    customerTemplate.name = name;
    customerTemplate.username = username;
    const created = await post(`${url}/customer/`).send(customerTemplate);
    const { customerId } = created.body;
    delete customerTemplate.password;
    delete customerTemplate.enabled;
    delete customerTemplate.customerId;
    delete customerTemplate.role;
    customerTemplate["customerIf"] = customerId;
    expect(created.status).to.equal(StatusCodes.CREATED);
    const customer = await get(`${url}/customer/${customerId}`);
    expect(customer.status).to.equal(StatusCodes.OK)
    expect(customer.body).to.containSubset(customerTemplate)
  });
  
  it('Get him by username', async() => {
    const customer = await get(`${url}/customer/username=${username}`);
    expect(customer.status).to.equal(StatusCodes.OK)
    expect(customer.body).to.containSubset(customerTemplate)

  } );
  it('Get him by name', async() => {
    const customer = await get(`${url}/customer/name=${name}`);
    expect(customer.status).to.equal(StatusCodes.OK)
    expect(customer.body).to.containSubset(customerTemplate)

  } );

  describe('Get non-existent customer ', () => {
    it('Get by id', async() => {
      try{
        await get(`${url}/customer/-1`);
      }catch(error){
        expect(error.status).to.equal(StatusCodes.NOT_FOUND);
        expect(error.response.body).to.containSubset({
          "errorMessage": "Customer with id -1 not found"
      });
      }
    });
    it('Get by username', async() => {
      try{
        await get(`${url}/customer/username=no-existo`);
      }catch(error){
        expect(error.status).to.equal(StatusCodes.NOT_FOUND);
        expect(error.response.body).to.containSubset({
          "errorMessage": "Customer with username no-existo not found"
      });
      }
    });
    it('Get by name', async() => {
      try{
        await get(`${url}/customer/name=no-existo`);
      }catch(error){
        expect(error.status).to.equal(StatusCodes.NOT_FOUND);
        expect(error.response.body).to.containSubset({
          "errorMessage": "Customer with name no-existo not found"
      });
      }
    });
  })
})