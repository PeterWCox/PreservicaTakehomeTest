import { PartialCustomer } from "../models/Customer";

export class CustomerUtils {
  public static isNameValid = (name: string) => name.length > 0;

  public static isEmailValid = (email: string): boolean => email.length > 0;

  public static isPhoneNumberValid = (phoneNumber: string): boolean =>
    phoneNumber.length > 0;

  public static isProfilePhotoValid = (profilePhoto: string): boolean =>
    profilePhoto.length > 0;

  public static isCustomerValid = (customer: PartialCustomer): boolean => {
    return (
      CustomerUtils.isNameValid(customer.name) &&
      CustomerUtils.isEmailValid(customer.email) &&
      CustomerUtils.isPhoneNumberValid(customer.phoneNumber) &&
      CustomerUtils.isProfilePhotoValid(customer.profilePhoto)
    );
  };
}
