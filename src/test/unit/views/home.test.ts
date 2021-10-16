import { expect } from 'chai';
import request from 'supertest';
import * as feesServiceMock from '../../http-mocks/fees'
import { app } from '../../../main/app';

const PAGE_URL = '/payment/:id/confirmation';
const headingClass = 'govuk-error-summary__title';

let htmlRes: Document;
describe('Home page', () => {
  beforeAll(async () => {
    feesServiceMock.resolveCreateToken()
    feesServiceMock.resolveGetPaymentStatus('sdfasdfasdfasdfgswdfawef');
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