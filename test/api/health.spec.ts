import { StatusCodes } from 'http-status-codes';
import agent = require('superagent');
import { expect } from 'chai';
const url = 'http://localhost:8080'

describe('Get health from api', () => {
  
  it('then should obtain status 200 from atsea page', async () => {
    const response = await agent.get(url);
    expect(response.status).to.equal(StatusCodes.OK)
  })
})