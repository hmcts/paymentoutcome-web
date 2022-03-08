import request from '../../app/client/request';
const config = require('config');
const otp = require('otp');
const s2sUrl =  config.get('s2s.url');
const payhubUrl =  config.get('payhub.url');
const paymentoutcomeSecret = config.get('secrets.ccpay.paymentoutcome-s2s-web');
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
    const otpPassword = otp({ secret: paymentoutcomeSecret }).totp();
    const serviceAuthRequest = {
      microservice: microService,
      oneTimePassword: otpPassword
    };
    return request.post({
      uri: `${s2sUrl}/lease`,
      body: serviceAuthRequest,
      json: true
    });
  }
}
