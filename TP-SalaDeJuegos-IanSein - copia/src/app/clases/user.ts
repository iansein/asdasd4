export class User {
  name: string;
  email: string;
  password: string;
  createdAt: number;

  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.createdAt = 0;
  }
}