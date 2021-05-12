import { Component, OnInit } from '@angular/core';
import { CategoryCard } from '../Models/interfaces';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {

  constructor() { }
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
  
  
}
