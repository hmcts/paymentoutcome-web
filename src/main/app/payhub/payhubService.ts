import request from '../../app/client/request'
const config = require('config')
const otp = require('otp');
const s2sUrl =  config.get('s2s.url')
const payhubUrl =  config.get('payhub.url')
const paymentoutcomeSecret = config.get('secrets.ccpay.paymentoutcome-web-s2s');
const microService = config.get('security.clientId');
import { StatusCodeError } from 'request-promise-native/errors'

export class FeesClientError extends Error {
  constructor (public message: string) {
    super(message)
    Object.setPrototypeOf(this, FeesClientError.prototype)
  }
}
function FeesClientErrorMapper (reason: Error) {
  if (reason instanceof StatusCodeError) {
    
    throw new FeesClientError((reason as any).response.body.cause)
  } else {
    throw reason
  }
}
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
    .then(() => true)
    .catch(FeesClientErrorMapper)  );
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