import { Logger } from '@hmcts/nodejs-logging';
import request from '../../app/client/request';
const config = require('config');
const otp = require('otp');
const s2sUrl =  config.get('s2s.url');
const payhubUrl =  config.get('payhub.url');
const paymentoutcomeSecret = config.get('secrets.ccpay.paymentoutcome-web-s2s');
const microService = config.get('security.clientId');

const logger = Logger.getLogger('server');

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
    .then(() => true));
  }
  static createAuthToken() {
    logger.info(paymentoutcomeSecret);
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