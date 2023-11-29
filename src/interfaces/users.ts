  export interface UserRegister {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  }

  export interface Edit {
    firstName: null | string,
    lastName: null | string,
    userName: null | string,
    email: null | string,
    password: string
}