import * as config from 'config';
import * as mock from 'nock';
import * as HttpStatus from 'http-status-codes';

const serviceBaseURL: string = config.get<string>('payhub.url')
const s2sUrl: string = config.get<string>('s2s.url')


export function resolveCreateToken () {
  mock(`${s2sUrl}`)
    .post(new RegExp(`/lease`))
    .reply(HttpStatus.OK, {
      token: 'token'
    })
}

export function resolveGetPaymentStatus (id: any) {
  mock(`${serviceBaseURL}`)
    .get(new RegExp(`/card-payments/${id}/status`))
    .reply(HttpStatus.OK)
}