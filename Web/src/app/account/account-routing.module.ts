import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import {CreateAccountComponent} from './create-account/create-account.component';
import {SendPaymentComponent} from './send-payment/send-payment.component';
import {AccountBalanceComponent} from './account-balance/account-balance.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'account', component: CreateAccountComponent},
      {path: 'payment', component: SendPaymentComponent},
      {path: 'account-balance', component: AccountBalanceComponent}
    ]),
  ],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
