

export class DateService {

  public static create(): DateService {
    return new DateService();
  }

  public constructor() { }

  public getNow(): Date {
    return new Date();
  }
}