import request from '../../app/client/request';
const config = require('config');
const s2sUrl =  config.get('s2s.url');
const payhubUrl =  config.get('payhub.url');
const microService = config.get('security.clientId');

export class PayhubService {
  static getPaymentStatus (uuid: string): Promise<boolean> {
    return this.createAuthToken().then((token: string)=> request.get({
      uri: `${payhubUrl}/card-payments/${uuid}/status`,
      json: true,
      headers: {
        ServiceAuthorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then((res: any) => res));
  }
  static createAuthToken() {
     const serviceAuthRequest = {
        microservice: microService
     };
    return request.post({
      uri: `${s2sUrl}/testing-support/lease`,
      body: serviceAuthRequest,
      json: true
    });
  }
}
