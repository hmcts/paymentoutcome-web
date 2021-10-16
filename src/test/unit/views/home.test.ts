import { expect } from 'chai';
import request from 'supertest';
import * as feesServiceMock from '../../http-mocks/fees'
import { app } from '../../../main/app';

const PAGE_URL = '/payment/234dw23ds34/confirmation';
const headingClass = 'govuk-error-summary__title';

let htmlRes: Document;
describe('Home page error flow', () => {
  beforeAll(async () => {
    await request(app).get(PAGE_URL).then(res => {
      htmlRes = new DOMParser().parseFromString(res.text, 'text/html');
    });
  });

  it('should display error header',  () => {
    const header = htmlRes.getElementsByClassName(headingClass);
    expect(header[0].innerHTML).contains('There is a problem');
  });

  it('should display error body text',  () => {
    const header = htmlRes.getElementsByClassName('govuk-list');
    expect(header[0].innerHTML).contains('Your card payment was unsuccessful.');
  });
});

describe('Home page success flow', () => {
  beforeAll(async () => {
    feesServiceMock.resolveGetPaymentStatus('234dw23ds34');
    await request(app).get(PAGE_URL).then(res => {
      htmlRes = new DOMParser().parseFromString(res.text, 'text/html');
    });
  });

  it('should display success title',  () => {
    const header = htmlRes.getElementsByClassName('govuk-panel__title');
    expect(header[0].innerHTML).contains('Payment successful');
  });

  it('should display error body text',  () => {
    const header = htmlRes.getElementsByClassName('govuk-panel__body');
    expect(header[0].innerHTML).contains('Your payment reference is<br><strong>HDJ2123F</strong>');
  });
});