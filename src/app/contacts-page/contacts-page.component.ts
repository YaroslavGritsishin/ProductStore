import { DOCUMENT } from '@angular/common';
import { Inject, Renderer2 } from '@angular/core';
import {  Component,  OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})


export class ContactsPageComponent implements OnInit {
  
  constructor(
    @Inject(DOCUMENT) private document: Document,
  private renderer2: Renderer2) { }
 
  ngOnInit(): void {

    const srcScript = this.renderer2.createElement('script');
    srcScript.type = 'text/javascript';
    srcScript.text = `
    ymaps.ready(init);
    function init(){
        const myMap = new ymaps.Map("map", {
            center: [55.74959704946908,37.53646812876792],
            zoom: 15 }
            );
        var myPlacemark = new ymaps.Placemark([55.74959704946908,37.53646812876792], {
            balloonContentHeader: 'Product Store',
            balloonContentBody: 'Наш офис располагается в близи станции метро "Деловой центр " на 3 этаже Башни Федерации.',
            balloonContentFooter: 'тел. +7 (495) 495-49-49',
            hintContent: 'Дополнительная информация'
        });
        myMap.geoObjects.add(myPlacemark);
      
      }`;
    this.renderer2.appendChild(this.document.body, srcScript);
  }

}
  
