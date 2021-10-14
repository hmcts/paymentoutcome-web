import { expect } from 'chai';

import { PayhubService } from '../../../main/app/payhub/payhubService';

describe('payhub service', () => {

  describe('on GET payment status', () => {
    it('should return the data when the server replies', async () => {
      expect(PayhubService.getPaymentStatus('sdfasdfasdfasdfgswdfawef')).to.not.equal(null)
    })
  })
  describe('on GET s2s token ', () => {
    it('should return the s2s token when the server replies', async () => {
      expect(PayhubService.createAuthToken()).to.not.equal(null)
    })
  })
})
