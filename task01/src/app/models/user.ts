export class User {
  constructor(
    public id: number,
    public fullName: string,
    public phone: string,
    public email: string,
    public dateOfBirth: string,
    public address: string
  ) {}
}
