import {Component, OnInit} from '@angular/core';
import {IStellarKeyPair} from '../../shared/services/stellar-key-pair';
import {StellarService} from '../../shared/services/stellar.service';
import {Response} from '@angular/http';


@Component({
  // selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  publicKey: string;
  secretKey: string;
  alerts: any = [];

  constructor(private stellarService: StellarService) {
  }

  ngOnInit() {
  }

  getAccountKeys(): void {
    let accountKeys: IStellarKeyPair;
    accountKeys = this.stellarService.getAccountKeys();
    this.publicKey = accountKeys.publicKey;
    this.secretKey = accountKeys.secretKey;
  }

  createAccount(): void {
    let response: Response;
    let errorMessage: any;
    // check response status
    this.stellarService.createAccount(this.publicKey)
      .subscribe(res => {
          response = res;
          this.alerts.push({
            type: 'success',
            msg: 'Account Created',
            timeout: 5000
          });
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
