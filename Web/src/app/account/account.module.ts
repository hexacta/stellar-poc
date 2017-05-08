import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountRoutingModule} from './account-routing.module';
import {CreateAccountComponent} from './create-account/create-account.component';
import {FormsModule} from '@angular/forms';
import {SendPaymentComponent} from './send-payment/send-payment.component';
import {AlertModule} from 'ngx-bootstrap';
import { AccountBalanceComponent } from './account-balance/account-balance.component';
import {AccountQrCodeComponent} from '../shared/account-qr-code/account-qr-code.component';
import {QRCodeModule} from 'angular2-qrcode';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AccountRoutingModule,
    AlertModule.forRoot(),
    QRCodeModule

  ],
  declarations: [CreateAccountComponent, SendPaymentComponent, AccountBalanceComponent, AccountQrCodeComponent]
})
export class AccountModule {
}
