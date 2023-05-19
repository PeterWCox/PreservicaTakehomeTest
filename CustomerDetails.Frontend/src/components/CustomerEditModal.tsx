import {
  DefaultButton,
  IconButton,
  Modal,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import { Customer } from "../models/Customer";
import { useState } from "react";
import { Text } from "@fluentui/react/lib/Text";
import { CustomerUtils } from "../utils/CustomerUtils";
import "./CustomerEditModal.css";

export interface ICustomerEditModalProps {
  customer: Customer;
  isModalOpen: boolean;
  onDismiss: () => void;
  onUpdate: (id: number, customer: Customer) => void;
  onDelete: (id: number) => void;
}

export const CustomerEditModal = (props: ICustomerEditModalProps) => {
  //States
  const [updatedCustomer, setUpdatedCustomer] = useState<Customer>({
    id: props.customer.id,
    name: props.customer.name,
    email: props.customer.email,
    phoneNumber: props.customer.phoneNumber,
    profilePhoto: props.customer.profilePhoto,
  });

  return (
    <Modal
      isOpen={props.isModalOpen}
      onDismiss={props.onDismiss}
      isBlocking={false}
    >
      <div className="modalContainer">
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
              CustomerUtils.isPhoneNumberValid(
                updatedCustomer?.phoneNumber ?? ""
              )
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
            {/* Save Button */}
            <PrimaryButton
              text="Save"
              onClick={() => props.onUpdate(props.customer.id, updatedCustomer)}
              disabled={!CustomerUtils.isCustomerValid(updatedCustomer)}
            />
            {/* Cancel Button */}
            <DefaultButton text="Cancel" onClick={props.onDismiss} />
          </div>

          {/* Delete Button */}
          <div className="buttonContainer">
            <PrimaryButton
              text="Delete"
              onClick={() => props.onDelete(props.customer.id)}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};
