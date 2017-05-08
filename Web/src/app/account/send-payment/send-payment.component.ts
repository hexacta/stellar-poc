import {Component, OnInit} from '@angular/core';
import {StellarService} from '../../shared/services/stellar.service';

@Component({
  selector: 'app-send-payment',
  templateUrl: './send-payment.component.html',
  styleUrls: ['./send-payment.component.css']
})
export class SendPaymentComponent implements OnInit {

  srcAccountSecret: string = 'SDHEWKI3GU6HVUPLOSOXJY2GZOBVGD4BJ5BJ7LXHDJ5VBH5XU3U2IHXR';
  destAccountPublic: string = 'GA6ZVBMWT6MUO2XCZWG2NFITCBMZRQXTJ4TWSJC4LCOUAH2D26RCSEIB';
  amount: string = '5';
  alerts: any = [];

  constructor(private stellarService: StellarService) {
  }

  ngOnInit() {
  }

  // TO-DO subscribe to the observable that should be returned by stellar.service.ts
  // activate the alert in the template
  makePayment(): void {
    let response: any;
    let errorMessage: string;
    this.stellarService.makePayment(this.srcAccountSecret, this.destAccountPublic, this.amount)
      .subscribe(res => {
          response = response;
          this.alerts.push(
            {
              type: 'success',
              msg: 'Payment success',
              timeout: 5000
            }
          );
        },
        error => {
          errorMessage = <any>error;
          this.alerts.push({
            type: 'danger',
            msg: 'Something went wrong',
            timeout: 5000
          });
        });
  }
}
