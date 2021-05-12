 export interface Card{
    title: string;
    img?: string;
    body: string;
    price?:number;
    id?: any;
 }
 export interface Login{
     Email:string,
     Password: string
 }
 export interface CategoryCard{
     id?: string;
     title: string;
     src: string;
 }
 export interface CustomerData{
     id?: string;
     name: string;
     address:string;
     discount: number;
     
 }
 export interface RegisterData{
    email: string;
    password: string; 
    name: string;
    address: string;
    discount: number;
 }
 export interface RegCustomer{
    Id?: string;
    Name: string;
    Address: string;
    Discount: number;
    Account:{
        Email: string;
        Password: string;
    } 
}



export interface Order{
    id?:string;
    customerId: string;
    orderDate: Date;
    shipmentDate?: Date;
    status: string;
    orderNumber:number;
    orderEmelents?: OrderElement[];
}

export interface OrderElement{
    id?: string;
    orderId?: string;
    itemCount:number;
    itemPrice: number;
    product: Product;

}

export class Product{
    id?: string;
    orderElementId?: string;
    name: string;
    category: string;
    code?: string;
    price: number;
    img?: string;
}