import { Component, Input, OnDestroy, OnInit, HostListener, ViewChildren, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../Models/interfaces'; 

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})

export class ProductPageComponent implements OnInit, OnDestroy {

  products: Product[];
  productsStream$ : Subscription;
  addProduct$: Subscription;
  deleteProduct$: Subscription;
  isAdd: boolean = false;
  isEdit: boolean = false;
  optionSelected: boolean = false;
  addForm: FormGroup;
  fileToUpload : File;
  constructor(
    private productServise : ProductService
  ) { }

  @ViewChildren('productTableRef') productTableRef : ElementRef;
  @HostListener('click', ['$event.target']) onClick(event: any){
    if(event.classList.contains('iconAdd')){
      this.isAdd = !this.isAdd;
    }
    const currentProduct = this.getProductOfCurrentRow(event,'iconDelete');
    if(currentProduct){
      this.deleteProduct$ = this.productServise.deleteProduct(currentProduct).subscribe();
      this.products = this.products.filter(x => x.id !== currentProduct.id);
    }
  }

  @HostListener('change', ['$event.target']) onChange(event: any){
    if(event.classList.contains('select')){
      if(event.value !== "Выберите категорию"){
        this.optionSelected = true;
      }
      else{
        this.optionSelected = false;
      }
    }
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.addForm = new FormGroup({
      productName: new FormControl(null,[
        Validators.required
      ]),
      productPrice: new FormControl(null,[
        Validators.required,
        Validators.min(0.1),
      ]),
      productCategory: new FormControl("Выберите категорию",[
        Validators.required,
        this.selectDefaultValueValidator
      ]),
      productImg: new FormControl(null)

    });
  }
  addProduct(){
    if(this.addForm.invalid){
      return
    }
    const result = {...this.addForm.value} ;
    const formData = new FormData();
    formData.append('name', result.productName);
    formData.append('category', result.productCategory);
    formData.append('price', result.productPrice);
    if(this.fileToUpload){
      formData.append('file', this.fileToUpload);
    }
    this.addProduct$ = this.productServise.addProduct(formData).subscribe(res =>{
      if(res){
        this.isAdd = false;
        this.ngOnInit();
      }
    });
    
  }

  getAllProducts(){
    this.productsStream$ = this.productServise.getAllProducts()
    .subscribe(res => {
      this.products = res;
      this.productsStream$.unsubscribe();
    });
  }

  uploadImg(files: FileList){
    this.fileToUpload = files.item(0);
  }

  close(event: Event){
    event.preventDefault();
    this.isAdd = false;
    this.isEdit = false;
    this.addForm.reset();
    this.addForm.controls.productCategory.setValue("Выберите категорию");
    this.optionSelected = false;
  }

  selectDefaultValueValidator(control: FormControl):{[key:string]:boolean}{
    if(control.value === "Выберите категорию"){
      return {"defaultValue": true};
    }
    else{
      return null;
    }
  }

  getProductOfCurrentRow($event: any, className: string): Product{
    let result: Product;  
    if($event.classList.contains(className)){
         result = new Product();
        const currentRow = $event.parentElement.parentElement.parentElement;
        const allTableRows = [...this.productTableRef["_results"][0].nativeElement.rows];
        allTableRows.forEach((row,index)=> {
          if(currentRow == row){
           result.id = allTableRows[index].cells.item(0).innerText;
           result.category = allTableRows[index].cells.item(1).innerText;
           result.name = allTableRows[index].cells.item(2).innerText;
           result.price = +allTableRows[index].cells.item(3).innerText;
          }
        });
      }
      return result;
    }

  ngOnDestroy(): void {
    if(this.productsStream$){
      this.productsStream$.unsubscribe();
    }
    if(this.addProduct$){
      this.addProduct$.unsubscribe();
    }
    if(this.deleteProduct$){
      this.deleteProduct$.unsubscribe();
    }
  }
}
