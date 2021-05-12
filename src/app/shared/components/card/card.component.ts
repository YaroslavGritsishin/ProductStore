import { Component, Input, OnInit } from '@angular/core';
import {Card, Product} from '../../../Models/interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() product: Product
  constructor() { }

  ngOnInit(): void {
  }
 
  
}
