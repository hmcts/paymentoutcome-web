import { Application } from 'express';
import { PayhubService } from '../app/payhub/payhubService';

export default function(app: Application): void {

  app.get('/payment/:id/confirmation', (req, res) => {
    const uuid = req.params.id;
    PayhubService
    .getPaymentStatus(uuid)
    .then((ress) => {
      console.log(ress);
      res.render('home', { error: false });
    }).catch((e)=> {
      res.render('home', { error: true });
    });
  });
}
