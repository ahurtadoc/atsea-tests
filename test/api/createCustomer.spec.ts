import { StatusCodes } from 'http-status-codes';
import { post } from 'superagent';
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
  enabled    : true,
  role       : "USER"
};
const url = env.baseUrl;
const username = randomUUID();

describe('When try to create new costumer', () => {
  
  

  it('User created correctly', async () => {
    customerTemplate.username = username;
    const created = await post(`${url}/customer/`).send(customerTemplate);
    expect(created.status).to.equal(StatusCodes.CREATED);
    expect(created.body).to.be.an('object');
    const { customerId } = created.body;
    expect(customerId).to.be.a('number');
    
    describe('Create existing user', () => {
      it('Create existing user', async() => {
        try{
          customerTemplate.username = username;
          await post(`${url}/customer/`).send(customerTemplate);
        }catch(error){
          expect(error.status).to.equal(StatusCodes.CONFLICT);
          expect(error.response.body).to.containSubset({ errorMessage : `A customer with username ${username} already exists.`});
        }
      })
    })

  })
})