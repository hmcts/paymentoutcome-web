import { Application } from 'express';
import { PayhubService } from '../app/payhub/payhubService';

export default function(app: Application): void {

  app.get('/payment/:id/confirmation', (req, res) => {
    const uuid = req.params.id;
    PayhubService
    .getPaymentStatus(uuid)
    .then((r: any) => {
      if(r.status == "Success") {
      res.render('home', { error: false, result: r});
      }
      else {
       res.render('home', { error: true, result: [] });
      }
    }).catch(()=> {
      res.render('home', { error: true, result: [] });
    });
  });
}
