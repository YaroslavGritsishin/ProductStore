import { Component, Input, OnInit } from '@angular/core';
import { CategoryCard } from '../../../Models/interfaces';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit {

  @Input() categoryCard: CategoryCard
  constructor() { }

  ngOnInit(): void {
  }

}
