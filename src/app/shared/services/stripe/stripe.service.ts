import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(private http: HttpClient) { }

  apiUrl = 'https://api.stripe.com/';

  createSubscription(customerId, priceValue) {

    const body = new HttpParams()
    .set('customer', customerId)
    .set('items[0][price]', priceValue);

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', 'Bearer sk_test_51HrjYlDnGuaAT4tp1HZIfBGgy6qX2AtINCdEvxFqWJEUHybAGgy2hYI8yhj6QZDFF10r1CdQOZa3axuvybKqzX8j009E1B24Db');

    // let headers = new HttpHeaders();
    // headers.set('Content-Type', 'application/x-www-form-urlencoded');
    // headers.set('Authorization', 'Basic sk_test_51HrjYlDnGuaAT4tp1HZIfBGgy6qX2AtINCdEvxFqWJEUHybAGgy2hYI8yhj6QZDFF10r1CdQOZa3axuvybKqzX8j009E1B24Db');

    return this.http.post(`${this.apiUrl}v1/subscriptions`, body.toString(), { headers: headers })
  }
}
