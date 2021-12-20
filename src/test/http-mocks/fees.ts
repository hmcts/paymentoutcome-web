import config from 'config';
import mock from 'nock';
import * as HttpStatus from 'http-status-codes';

const serviceBaseURL: string = config.get<string>('payhub.url')
const s2sUrl: string = config.get<string>('s2s.url')


export function resolveCreateToken () {
  mock(`${s2sUrl}`)
    .persist()
    .post(/.*/)
    .reply(HttpStatus.OK, {
      token: 'token'
    })
}

export function resolveGetPaymentStatus (id: any) {
  mock(`${serviceBaseURL}`)
    .persist()
    .get(/.*/)
    .reply(HttpStatus.OK, {
      status: 'success',
      reference: 'RC-1234-1234-1343-1234'
    })
}

export function rejectGetPaymentStatus (id: any) {
  mock(`${serviceBaseURL}`)
    .persist()
    .get(/.*/)
    .reply(HttpStatus.OK, {
      status: 'failure',
      reference: 'RC-1234-1234-1343-1234'
    })
}

export function resolvePaymentStatus (id: any) {
  mock(`${serviceBaseURL}`)
    .persist()
    .get(/.*/)
    .reply(HttpStatus.OK)
}