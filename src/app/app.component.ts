import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StripePaymentComponent } from './stripe-payment/stripe-payment.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stripe-integrate-angular';

  constructor(
    public dialog: MatDialog,
    private http: HttpClient
  ) {

  }

  openPaymentForm() {
    const dialogRef = this.dialog.open(StripePaymentComponent, {
      minWidth: "500px",
      height: "500px",
      data: {totalAmount: 500}
    });
    dialogRef.afterClosed().subscribe(response => {
      console.log('Token : ', response);
    });
  }

  addSubscription() {
    let authorizationData = 'Basic ' + btoa('sk_test_51HrjYlDnGuaAT4tp1HZIfBGgy6qX2AtINCdEvxFqWJEUHybAGgy2hYI8yhj6QZDFF10r1CdQOZa3axuvybKqzX8j009E1B24Db' + ':' + '');
    const headerOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': authorizationData
      })
  };
  let body = `customer=${'cus_ISf6DFyg4CGGbG'}&items[0][price]=${'price_1HrjmNJAJfZb9HEBEe4BKxfd'}`;
  // this.http.post('https://api.stripe.com/v1/subscriptions', body, { headers: headerOptions })
  //   .subscribe(response => {
  //     console.log(response)
  //   })
  }
}
