export class ServiceType {
  private id: string;
  private userId: string;
  private name: string;

  constructor(userId: string, name: string, id = null) {
    if (!id) this.id = String(Date.now());
    else this.id = id;
    this.userId = userId;
    this.name = name;
  }

  public getId() {
    return this.id;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getName() {
    return this.name;
  }

  public getPlainData() {
    return {
      id: this.id,
      userId: this.userId,
      name: this.name,
    };
  }
}
