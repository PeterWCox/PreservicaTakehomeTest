import { Customer } from "../models/Customer";

export class CustomerUtils {
  public static getInitials(customer: Customer): string {
    const names: string[] = customer.name.split(" ");

    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }

    //Otherwise return the first letter of the first and last name
    return `${names[0].charAt(0)}${names[names.length - 1].charAt(
      0
    )}`.toUpperCase();
  }
}
