import axios from "axios";
import { Customer, PartialCustomer } from "../models/Customer";
import { faker } from "@faker-js/faker";

export interface ICustomerRepository {
  getCustomerById(id: number): Promise<Customer>;
  getCustomers(): Promise<Customer[]>;
  createCustomer(customer: PartialCustomer): Promise<void>;
  updateCustomer(id: number, customer: PartialCustomer): Promise<void>;
  deleteCustomer(id: number): Promise<void>;
  createFakeCustomers(count: number): Promise<void>;
}

export class CustomerRepository implements ICustomerRepository {
  public async getCustomerById(id: number): Promise<Customer> {
    const response = await axios.get(
      `https://localhost:7142/api/Customers/${id}`
    );
    return response.data as Customer;
  }

  public async getCustomers(): Promise<Customer[]> {
    const response = await axios.get(`https://localhost:7142/api/Customers`);
    return response.data as Customer[];
  }

  public async createCustomer(customer: PartialCustomer): Promise<void> {
    await axios.post(`https://localhost:7142/api/Customers`, customer);
  }

  public async updateCustomer(
    id: number,
    customer: PartialCustomer
  ): Promise<void> {
    await axios.put(`https://localhost:7142/api/Customers/${id}`, customer);
  }

  public async deleteCustomer(id: number): Promise<void> {
    await axios.delete(`https://localhost:7142/api/Customers/${id}`);
  }

  public async createFakeCustomers(count: number): Promise<void> {
    const promises = [];

    for (let index = 0; index < count; index++) {
      const customer: PartialCustomer = {
        name: faker.person.fullName(),
        phoneNumber: "11111111111",
        email: faker.internet.email(),
        profilePhoto: faker.image.avatar(),
      };
      promises.push(this.createCustomer(customer));
    }

    //Resolve all promises
    await Promise.all(promises);
  }
}
