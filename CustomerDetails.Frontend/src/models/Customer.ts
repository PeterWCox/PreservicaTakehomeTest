export interface Customer {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  profilePhoto: string;
}

export type PartialCustomer = Omit<Customer, "id">;
