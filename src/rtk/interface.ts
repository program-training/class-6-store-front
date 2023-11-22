export interface Product {
    [x: string]: any;
    id: number;
    title: string;
    image:string;
    price: number;
    description: string;
    category: string;
    clickCount:number;
    quantity: number;
    attributes: Attributes[];
  }
  
  export interface Attributes {
    key: string;
    value: number | string;
  }
