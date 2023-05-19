import { PrimaryButton } from "@fluentui/react";
import { Text } from "@fluentui/react/lib/Text";
import { Pagination } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Customer, PartialCustomer } from "../models/Customer";
import { CustomerRepository } from "../repositories/CustomerRepository";
import { PaginationUtils } from "../utils/PaginationUtils";
import { CustomerCard } from "./CustomerCard/CustomerCard";
import { CustomerCardShimmer } from "./CustomerCard/CustomerCardShimmer";
import { CustomerEditModal } from "./CustomerEditModal";
import "./CustomersApp.css";

export const CustomersApp = () => {
  //Constants
  const numberOfFakeCustomersToGenerate = 10;
  const customersPerPage = 20;

  //States
  const [customerToEdit, setCustomerToEdit] = useState<Customer | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  //Hooks
  const queryClient = useQueryClient();

  //Get Customers Query
  const { isLoading: isLoadingCustomers, data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const repo = new CustomerRepository();
      return await repo.getCustomers();
    },
  });

  // Update Customer Mutation;
  const { mutateAsync: updateCustomer, isLoading: isUpdatingCustomer } =
    useMutation({
      mutationFn: async ({
        id,
        customer,
      }: {
        id: number;
        customer: PartialCustomer;
      }) => {
        const repo = new CustomerRepository();
        await repo.updateCustomer(id, customer);
      },
      onSuccess: () => {
        //Invalidate the query to refetch the data
        queryClient.invalidateQueries({ queryKey: ["customers"] });
      },
    });

  // Delete Customer Mutation
  const { mutateAsync: deleteCustomer, isLoading: isDeletingCustomer } =
    useMutation({
      mutationFn: async (id: number) => {
        const repo = new CustomerRepository();
        await repo.deleteCustomer(id);
      },
      onSuccess: () => {
        //Invalidate the query to refetch the data
        queryClient.invalidateQueries({ queryKey: ["customers"] });
      },
    });

  //Add Fake Customers Mutation
  const {
    mutateAsync: createFakeCustomers,
    isLoading: isLoadingFakeCustomers,
  } = useMutation({
    mutationFn: async () => {
      const repo = new CustomerRepository();
      const updatedCustomer = await repo.createFakeCustomers(
        numberOfFakeCustomersToGenerate
      );
      return updatedCustomer;
    },
    onSuccess: () => {
      //Invalidate the query to refetch the data
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  //Handlers
  const onDismiss = () => {
    setIsEditModalOpen(false);
    setCustomerToEdit(null);
  };

  const onUpdate = (id: number, customer: PartialCustomer) => {
    onDismiss();
    updateCustomer({ id, customer });
  };

  const onDelete = (id: number) => {
    onDismiss();
    deleteCustomer(id);
  };

  const isLoading =
    isLoadingCustomers ||
    isLoadingFakeCustomers ||
    isUpdatingCustomer ||
    isDeletingCustomer;

  return (
    <>
      <div className="container">
        {/* Heading */}
        <Text variant="xxLarge">Customers</Text>

        {/* Subheading */}
        <div className="subheading">
          <PrimaryButton
            onClick={() => createFakeCustomers()}
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
            ? PaginationUtils.getDataForCurrentPage(
                page,
                customersPerPage,
                customers
              )?.map((customer: any) => (
                <CustomerCard
                  key={customer.id}
                  customer={customer}
                  onClick={() => {
                    setCustomerToEdit(customer);
                    setIsEditModalOpen(true);
                  }}
                />
              ))
            : [...Array(customersPerPage)].map(() => <CustomerCardShimmer />)}
        </div>

        {/* Pagination */}
        {!isLoading && customers!.length > 0 ? (
          <div className="pagination">
            <Pagination
              page={page}
              count={PaginationUtils.getNumberOfPages(
                customersPerPage,
                customers
              )}
              onChange={(_, page) => setPage(page)}
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
          isModalOpen={isEditModalOpen}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onDismiss={onDismiss}
        />
      ) : null}
    </>
  );
};
