import request from 'app/client/request'
// import { StatusCodeError } from 'request-promise-native/errors'
const config = require('config')
const otp = require('otp');
//const payhubUrl = config.get('payhub.url')
const s2sUrl =  config.get('s2s.url')
export class FeesClientError extends Error {
  constructor (public message: string) {
    super(message)
    Object.setPrototypeOf(this, FeesClientError.prototype)
  }
}

// function FeesClientErrorMapper (reason: Error) {
//   if (reason instanceof StatusCodeError) {
//     throw new FeesClientError((reason as any).response.body.cause)
//   } else {
//     throw reason
//   }
// }

export class PayhubService {

  static getPaymentStatus (): Promise<boolean> {
    return this.createAuthToken()
    .then((token: any) => {
      
      console.log(token)
    } 
    );
  }
  static createAuthToken() {
    const otpPassword = otp({ secret: 'G5XTFNBUW4P6ZP4F' }).totp();
    const serviceAuthRequest = {
      microservice: "ccpay_bubble",
      oneTimePassword: otpPassword
    };
    //return otpPassword;
    return request.post({
      uri: `${s2sUrl}/lease`,
      body: serviceAuthRequest,
      json: true
    });
  }


}