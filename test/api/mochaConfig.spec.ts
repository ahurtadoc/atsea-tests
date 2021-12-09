import { StatusCodes } from 'http-status-codes';
import { get } from 'superagent';
import { expect } from 'chai';

describe('First Api Tests', () => {
  it('Consume GET Service', async () => {
      const response = await get('https://httpbin.org/ip');
    
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body).to.have.property('origin');
    });
});