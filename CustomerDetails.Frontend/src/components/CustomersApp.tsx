import { useQuery, useQueryClient } from "@tanstack/react-query";
import "./CustomersApp.css";
import axios from "axios";
import { Text } from "@fluentui/react/lib/Text";
import { Customer } from "../models/Customer";
import { PrimaryButton, Slider } from "@fluentui/react";
import { CustomerRepository } from "../repositories/CustomerRepository";
import { useState } from "react";
import { CustomerEditModal } from "./CustomerEditModal";
import { Pagination } from "@mui/material";
import { CustomerCard } from "./CustomerCard/CustomerCard";
import { CustomerCardShimmer } from "./CustomerCard/CustomerCardShimmer";

export const CustomersApp = () => {
  //States
  const [numberOfFakeCustomersToGenerate, setNumberOfFakeCustomersToGenerate] =
    useState<number>(10);
  const [customerToEdit, setCustomerToEdit] = useState<Customer | null>(null);
  const [isCustomerEditModalOpen, setIsCustomerEditModalOpen] =
    useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [customersPerPage, setCustomersPerPage] = useState<number>(20);

  //Hooks
  const queryClient = useQueryClient();

  //Get Customers
  const { isLoading, data } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      //Introduce a 5s delay to show the loading state
      await new Promise((resolve) => setTimeout(resolve, 5000));

      //Make a request to the server using axios and add CORS headers
      const response = await axios.get("https://localhost:7142/api/Customers");
      const customers = (response.data as Customer[])?.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      return customers;
    },
  });

  const generateFakeUsers = () => {
    const createUsers = async () => {
      const repo = new CustomerRepository();
      await repo.createFakeCustomers(numberOfFakeCustomersToGenerate);
    };
    createUsers();
    //Invalidate the query to refetch the data
    queryClient.invalidateQueries({ queryKey: ["customers"] });
  };

  const numberOfPages = data?.length
    ? Math.ceil(data!.length / customersPerPage)
    : 0;

  //Get users corresponding to page
  const dataForCurrentPage = data?.slice(
    (currentPage - 1) * customersPerPage,
    currentPage * customersPerPage
  );

  return (
    <>
      <div className="container">
        {/* Heading */}
        <Text variant="xxLarge">Customers</Text>

        {/* Subheading */}
        <div className="subheading">
          <PrimaryButton
            onClick={generateFakeUsers}
            style={{
              width: "fit-content",
            }}
          >
            Add 10 Sample Customers
          </PrimaryButton>
        </div>

        {/* Customers */}
        <div className="customers">
          {!isLoading
            ? dataForCurrentPage?.map((customer: any) => (
                <CustomerCard
                  key={customer.id}
                  customer={customer}
                  onClick={() => {
                    setCustomerToEdit(customer);
                    setIsCustomerEditModalOpen(true);
                  }}
                />
              ))
            : [...Array(customersPerPage)].map((_, index) => (
                <CustomerCardShimmer />
              ))}
        </div>

        {/* Pagination */}
        {!isLoading ? (
          <div className="pagination">
            <Pagination
              page={currentPage}
              count={numberOfPages}
              onChange={(_, page) => setCurrentPage(page)}
              color="primary"
            />
          </div>
        ) : null}
      </div>

      {/* Edit Modal */}
      {customerToEdit ? (
        <CustomerEditModal
          key={customerToEdit.id}
          customer={customerToEdit}
          isModalOpen={isCustomerEditModalOpen}
          onDismiss={() => {
            setIsCustomerEditModalOpen(false);
            setCustomerToEdit(null);
          }}
        />
      ) : null}
    </>
  );
};
