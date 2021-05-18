import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Card, CategoryCard } from '../Models/interfaces';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {

  
  constructor(
    private prodService: ProductService,
    private router: Router 
  ) { }
  categoryCards: CategoryCard[];
  ngOnInit(): void {
    this.categoryCards =[
      {title: 'Хлебная Продукция', src: '../assets/BR.png'},
      {title: 'Фрукты', src: '../assets/FR.png'},
      {title: 'Овощи', src: '../assets/VG.png'},
      {title: 'Молочная Продукция', src: '../assets/ML.png'},
      {title: 'Макаронные Изделия', src: '../assets/MK.png'},
      {title: 'Бытовая Химия', src: '../assets/BX.png'}
    ] 
  }
  
  getCurrentCard(card : Card){
    this.prodService.selectedCategory = card.title;
    this.router.navigate(['/']);
  }
}
