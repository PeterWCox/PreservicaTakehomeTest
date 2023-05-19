import {
  DefaultButton,
  IconButton,
  Modal,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import { Customer, PartialCustomer } from "../models/Customer";
import { useState } from "react";
import { Text } from "@fluentui/react/lib/Text";
import { useMutation } from "@tanstack/react-query";
import { CustomerUtils } from "../utils/CustomerUtils";
import "./CustomerEditModal.css";
import { CustomerRepository } from "../repositories/CustomerRepository";

export interface ICustomerEditModalProps {
  customer: Customer;
  isModalOpen: boolean;
  onDismiss: () => void;
}

export const CustomerEditModal = (props: ICustomerEditModalProps) => {
  //States
  const [updatedCustomer, setUpdatedCustomer] = useState<PartialCustomer>({
    name: props.customer.name,
    email: props.customer.email,
    phoneNumber: props.customer.phoneNumber,
    profilePhoto: props.customer.profilePhoto,
  });

  // Mutations;
  const mutation = useMutation({
    mutationFn: async (customer: PartialCustomer) => {
      const repo = new CustomerRepository();
      const updatedCustomer = await repo.updateCustomer(
        props.customer.id,
        customer
      );
      return updatedCustomer;
    },
  });

  return (
    <Modal
      isOpen={props.isModalOpen}
      onDismiss={props.onDismiss}
      isBlocking={false}
    >
      <div className="container">
        <div className="header">
          <Text variant="large">Edit details</Text>
          <IconButton
            styles={{
              root: {
                // color: theme.palette.neutralPrimary,
                marginLeft: "auto",
                marginTop: "4px",
                marginRight: "2px",
              },
              rootHovered: {
                // color: theme.palette.neutralDark,
              },
            }}
            iconProps={{ iconName: "Cancel" }}
            ariaLabel="Close popup modal"
            onClick={props.onDismiss}
          />
        </div>

        {/* Form */}
        <form className="body">
          {/* Name */}
          <TextField
            label="Name"
            value={updatedCustomer?.name}
            onChange={(_, newValue) =>
              setUpdatedCustomer({ ...updatedCustomer, name: newValue ?? "" })
            }
            errorMessage={
              CustomerUtils.isNameValid(updatedCustomer?.name ?? "")
                ? undefined
                : "Please enter a valid name"
            }
          />

          {/* Email */}
          <TextField
            label="Email"
            value={updatedCustomer?.email}
            onChange={(_, newValue) =>
              setUpdatedCustomer({ ...updatedCustomer, email: newValue ?? "" })
            }
            errorMessage={
              CustomerUtils.isEmailValid(updatedCustomer?.email ?? "")
                ? undefined
                : "Please enter a valid e-mail"
            }
          />

          {/* Phone Number */}
          <TextField
            label="Phone number"
            value={updatedCustomer?.phoneNumber}
            onChange={(_, newValue) =>
              setUpdatedCustomer({
                ...updatedCustomer,
                phoneNumber: newValue ?? "",
              })
            }
            errorMessage={
              CustomerUtils.isEmailValid(updatedCustomer?.phoneNumber ?? "")
                ? undefined
                : "Please enter a valid phone number"
            }
          />

          {/* Profile Photo */}
          <TextField
            label="Profile Photo"
            value={updatedCustomer?.profilePhoto}
            onChange={(_, newValue) =>
              setUpdatedCustomer({
                ...updatedCustomer,
                profilePhoto: newValue ?? "",
              })
            }
            errorMessage={
              CustomerUtils.isProfilePhotoValid(
                updatedCustomer?.phoneNumber ?? ""
              )
                ? undefined
                : "Please enter a valid profile photo URL"
            }
          />

          <div className="buttonContainer">
            <PrimaryButton
              text="Save"
              onClick={() => {
                mutation.mutate(updatedCustomer);
                props.onDismiss();
              }}
              disabled={CustomerUtils.isCustomerValid(updatedCustomer)}
            />
            <DefaultButton text="Cancel" onClick={props.onDismiss} />
          </div>
        </form>
      </div>
    </Modal>
  );
};
