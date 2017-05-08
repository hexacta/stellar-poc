import {Component, OnInit} from '@angular/core';
import {StellarService} from '../../shared/services/stellar.service';
import {AccountBalance} from './account-balance.model';

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.css']
})
export class AccountBalanceComponent implements OnInit {

  accountId: string;
  qrVisible = false;
  // balances: any = [];
  balances: AccountBalance[] = new Array<AccountBalance>();

  constructor(private stellarService: StellarService) {
  }

  ngOnInit() {
  }

  checkAccountBalance(): void {
    let errorMessage: any;
    this.balances = [];
    this.stellarService.checkAccountBalance(this.accountId)
      .subscribe(res => {
          this.balances = res;
        },
        error => {
          errorMessage = <any>error;
        });
  }

  qrCode(): void {
    this.qrVisible = !this.qrVisible;
  }

}
