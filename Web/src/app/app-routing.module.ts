import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CreateAccountComponent} from './account/create-account/create-account.component';
import {StellarNetworkPageComponent} from './stellar-dashboard/stellar-network-page.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: 'stellar-dashboard', component: StellarNetworkPageComponent}
    ]),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
