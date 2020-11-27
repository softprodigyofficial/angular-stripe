import { MatDialog } from '@angular/material/dialog';
import { StripePaymentComponent } from './stripe-payment/stripe-payment.component';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StripeService } from './shared/services/stripe/stripe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, AfterViewInit {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  _totalAmount: number;
  card: any;
  cardHandler = this.onChange.bind(this);
  cardError: string;
  constructor(
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private stripeService: StripeService
  ) {

  }

  ngOnDestroy() {
    if (this.card) {
      // We remove event listener here to keep memory clean
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }
  }

  ngAfterViewInit() {
    this.initiateCardElement();
  }

  initiateCardElement() {
    // Giving a base style here, but most of the style is in scss file
    const cardStyle = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };
    this.card = elements.create('card', { cardStyle });
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }

  onChange({ error }) {
    if (error) {
      this.cardError = error.message;
    } else {
      this.cardError = null;
    }
    this.cd.detectChanges();
  }

  onError(error) {
    if (error.message) {
      this.cardError = error.message;
    }
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

  // addSubscription() {
  //   let authorizationData = 'Basic ' + btoa('sk_test_51HrjYlDnGuaAT4tp1HZIfBGgy6qX2AtINCdEvxFqWJEUHybAGgy2hYI8yhj6QZDFF10r1CdQOZa3axuvybKqzX8j009E1B24Db' + ':' + '');
  //   const headerOptions = {
  //     headers: new HttpHeaders({
  //         'Content-Type':  'application/json',
  //         'Authorization': authorizationData
  //     })
  // };
  // let body = `customer=${'cus_ISf6DFyg4CGGbG'}&items[0][price]=${'price_1HrjmNJAJfZb9HEBEe4BKxfd'}`;
  // // this.http.post('https://api.stripe.com/v1/subscriptions', body, { headers: headerOptions })
  // //   .subscribe(response => {
  // //     console.log(response)
  // //   })
  // }

  addSubscription() {
    this.stripeService.createSubscription('cus_ISfcZtPxz0isDp', 'price_1HrxUoDnGuaAT4tpKrbDFjJ4')
      .subscribe(response => {
        console.log('Subscription response : ', response)
      })
  }
}
