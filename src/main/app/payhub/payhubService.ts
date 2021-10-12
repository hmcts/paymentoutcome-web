import request from '../../app/client/request'
const config = require('config')
const otp = require('otp');
const s2sUrl =  config.get('s2s.url')
const paymentoutcomeSecret = config.get('secrets.ccpay.paymentoutcome-web-s2s');
const microService = config.get('security.clientId');
export class FeesClientError extends Error {
  constructor (public message: string) {
    super(message)
    Object.setPrototypeOf(this, FeesClientError.prototype)
  }
}

export class PayhubService {
  static getPaymentStatus (): Promise<boolean> {
    return this.createAuthToken()
    .then((token: any) => token);
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