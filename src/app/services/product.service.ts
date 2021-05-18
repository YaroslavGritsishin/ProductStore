import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_API_URL } from '../Models/app-injection-token';
import { Product }  from '../Models/interfaces';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  selectedCategory: string;
  constructor(
    private http: HttpClient,
    @Inject(AUTH_API_URL) private authUrl: string
  ) { }


  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.authUrl}product/getallproducts`);
  }
  addProduct(data : FormData): Observable<string>{
    return this.http.post<string>(`${this.authUrl}product/addProduct`,
    data);
   }
   deleteProduct(product: Product ): Observable<string>{
    return this.http.post<string>(`${this.authUrl}product/deleteProduct`,
    product);
   }
}
