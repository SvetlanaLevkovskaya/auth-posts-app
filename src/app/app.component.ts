import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService) {}

  async ngOnInit(): Promise<void> {
    await this.showSpinner();
    await this.hideSpinnerAfterDelay(3000);
  }

  private async showSpinner(): Promise<void> {
    await this.spinner.show();
  }

  private async hideSpinnerAfterDelay(delay: number): Promise<void> {
    setTimeout(async () => {
      await this.spinner.hide();
    }, delay);
  }
}
