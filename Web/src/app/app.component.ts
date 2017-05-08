import {Component, OnInit} from '@angular/core';
import {StellarService} from './shared/services/stellar.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app works!';

  constructor(private _stellarService: StellarService) {
  }

  ngOnInit(): void {
  }

}
