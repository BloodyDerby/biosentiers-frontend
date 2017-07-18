import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'bio-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  title = 'BioSentiers';

  ngOnInit() {
    moment.locale('fr');
  }
}
