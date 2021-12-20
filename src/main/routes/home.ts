import { Application } from 'express';
import { PayhubService } from '../app/payhub/payhubService';

export default function(app: Application): void {

  app.get('/payment/:id/confirmation', (req, res) => {
    const uuid = req.params.id;
    PayhubService
    .getPaymentStatus(uuid)
    .then((r: any) => {
      if(r.status == "success") {
        console.log(r.status)
      res.render('home', { error: false, result: r});
      }
      else {
        console.log(r.status)
       res.render('home', { error: true, result: [] });
      }
    }).catch(()=> {
      res.render('home', { error: true, result: [] });
    });
  });
}
