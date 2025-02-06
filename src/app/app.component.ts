import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone : false
})
export class AppComponent {
  email: string = '';
  number: number | null = null;
  password: string = '';

  bindData(value: string | number | null) {
    console.log('Girilen değer:', value);
  }
}