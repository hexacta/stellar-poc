import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {StellarService} from './shared/services/stellar.service';
import {AccountModule} from './account/account.module';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {StellarDashboardModule} from './stellar-dashboard/stellar-dashboard.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AccountModule,
    StellarDashboardModule

  ],
  providers: [StellarService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
