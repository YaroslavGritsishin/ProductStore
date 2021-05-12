import { Inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AUTH_API_URL} from '../../../Models/app-injection-token';
import {CustomerData, Order} from '../../../Models/interfaces';
import { Observable, ReplaySubject, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
    @Inject(AUTH_API_URL) private authUrl: string
  ) { }
  currentCustomerId: string;
  subjCustomerId$: Subject<string> = new Subject();

  setCustomerId(value: string){
   this.subjCustomerId$.next(value);
  }
  getCustomerId(): Observable<string>{
    return this.subjCustomerId$;
   }

  getAllCustomers(): Observable<CustomerData[]>{
   return this.http.get<CustomerData[]>(`${this.authUrl}customer/getall`);
  }

  updateCustomer(customerData: CustomerData): Observable<string>{
    return this.http.post<string>(`${this.authUrl}customer/update`, customerData);
  }

  getOrdersByCustomerId(customerId: string): Observable<Order[]>{
    return this.http.post<Order[]>(`${this.authUrl}order/getById`, customerId);
  }
  
  addOrderByCustomerId(order: Order): Observable<string>{
    return this.http.post<string>(`${this.authUrl}order/getById`, order);
  }
  

}

