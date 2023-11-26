export interface Product {
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

  export interface UserRegister {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  }
