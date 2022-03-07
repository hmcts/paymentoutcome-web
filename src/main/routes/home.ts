import { Application } from 'express';
import { PayhubService } from '../app/payhub/payhubService';
const config = require('config');

const exuiUrl =  config.get('exui.url').replace('.prod', '');

export default function(app: Application): void {

  app.get('/payment/:id/confirmation', (req, res) => {
    const uuid = req.params.id;
    PayhubService
    .getPaymentStatus(uuid)
    .then((r: any) => {
      if(r.status == "Success") {
      res.render('home', { error: false, result: r, url: exuiUrl});
      }
      else {
       res.render('home', { error: true, result: r, url: exuiUrl });
      }
    }).catch(()=> {
      res.render('home', { error: true, result: [], url: exuiUrl });
    });
  });
}
