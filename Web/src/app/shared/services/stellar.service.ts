import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {IStellarKeyPair} from './stellar-key-pair';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AccountBalance} from '../../account/account-balance/account-balance.model';
import {forEach} from '@angular/router/src/utils/collection';


@Injectable()
export class StellarService {

  public server: any;

  constructor(private _http: Http) {
    this.server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    StellarSdk.Network.useTestNetwork();
  }

  checkService(): void {
    console.log(StellarSdk);
  }

  getAccountKeys(): IStellarKeyPair {
    let pair: any = StellarSdk.Keypair.random();
    let stellarKeys: IStellarKeyPair = new IStellarKeyPair();
    stellarKeys.publicKey = pair.publicKey();
    stellarKeys.secretKey = pair.secret();
    return stellarKeys;
  }

  createAccount(publicKey: string): Observable<Response> {
    let apiUrl: string = 'https://horizon-testnet.stellar.org/friendbot';
    let params = new URLSearchParams();
    params.set('addr', publicKey);
    let options = new RequestOptions({
      params: params
    });
    return this._http.get(apiUrl, options)
      .map((response: Response) => response.json())
      .catch(this.HandleError);
  }

  makePayment(srcAccountSecret: string, destAccountPublic: string, amountToTransfer: string): Observable<Response> {
    let accountSource: any = StellarSdk.Keypair.fromSecret(srcAccountSecret);
    let server = this.server; // WTF
    // StellarSdk.Network.useTestNetwork();
    // First, check to make sure that the destination account exists.
    // You could skip this, but if the account does not exist, you will be charged
    // the transaction fee when the transaction fails.
    let obs = Observable.fromPromise(this.server.loadAccount(destAccountPublic)
      // If the account is not found, surface a nicer error message for logging.
        .catch(StellarSdk.NotFoundError, function (error) {
          throw new Error('The destination account does not exist!');
        })
        // If there was no error, load up-to-date information on your account.
        .then(function () {
          console.log('loading account');
          return server.loadAccount(accountSource.publicKey());
        })
        .then(function (sourceAccount) {
          // Start building the transaction.
          console.log('building transaction');
          let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
            .addOperation(StellarSdk.Operation.payment({
              destination: destAccountPublic,
              // Because Stellar allows transaction in many currencies, you must
              // specify the asset type. The special "native" asset represents Lumens.
              asset: StellarSdk.Asset.native(),
              amount: amountToTransfer
            }))
            // A memo allows you to add your own metadata to a transaction. It's
            // optional and does not affect how Stellar treats the transaction.
            .addMemo(StellarSdk.Memo.text('Test Transaction MS-Hx'))
            .build();
          // Sign the transaction to prove you are actually the person sending it.
          console.log('signing transfer');
          transaction.sign(accountSource);
          // And finally, send it off to Stellar!
          console.log('sending transaction');
          return server.submitTransaction(transaction);
        })
        .then(function (result) {
          console.log('Success! Results:', result);
          // return result.map((transaction: Response) => transaction.json());
          return result;
        })
        .catch(function (error) {
          console.error('Something went wrong!', error);
          this.HandleError(error);
        })
    );
    return obs;
  }

  checkAccountBalance(accountId: string): Observable<Array<AccountBalance>> {
    return Observable.fromPromise(this.server.loadAccount(accountId)
      .then(function (account) {
        // console.log(account.balances);
        return account;
      }))
      .map((r: any) => <Array<AccountBalance>> r.balances)
      .catch(this.HandleError);

  }

  HandleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
