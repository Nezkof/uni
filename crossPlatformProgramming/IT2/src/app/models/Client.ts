export class Client {
  public client_id;
  public name;
  public surname;
  public email;

  constructor(clientId: string, name: string, surname: string, email: string) {
    this.client_id = clientId;
    this.name = name;
    this.surname = surname;
    this.email = email;
  }
}
