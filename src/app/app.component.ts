import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show().then(r => console.log('app-r', r));

    setTimeout(() => {
      this.spinner.hide().then(r => console.log('app-hide-r', r));
    }, 3000);
  }
}
