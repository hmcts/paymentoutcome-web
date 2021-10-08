import { Application } from 'express';
import { PayhubService } from '../app/payhub/payhubService';

export default function(app: Application): void {

  app.get('/', (req, res) => {
    const token = PayhubService
    .getPaymentStatus();
    res.render('home', {tt: token} );
    // .then((token) => {
    //   res.render('home', {tt: token} );
    // });
  });

}
