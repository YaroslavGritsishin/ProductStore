import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../Models/interfaces';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  products : Product[];
  productsStream$: Subscription;
  productCategory$: Subscription;
  constructor(
    private productService: ProductService
  ) { }
  

  ngOnInit(): void {
    this.productsStream$ = this.productService.getAllProducts()
    .subscribe(resp => {
      if(resp){
        if(this.productService.selectedCategory){
          this.products = resp.filter(p => p.category === this.productService.selectedCategory.toLocaleLowerCase())
          this.productService.selectedCategory = null;
        }else{
          this.products = resp;
        }
      }
    });
    
  }

  ngOnDestroy(): void {
    if(this.productsStream$){
      this.productsStream$.unsubscribe();
    }
    if(this.productCategory$){
      this.productCategory$.unsubscribe();
    }
  }

}
