import { Persona, PersonaSize } from "@fluentui/react";
import { Customer } from "../../models/Customer";
import "./CustomerCard.css";

export interface ICustomerCardProps {
  customer: Customer;
  onClick: () => void;
}

export const CustomerCard = (props: ICustomerCardProps) => {
  const { customer } = props;

  return (
    <div className="customerWrapper" onClick={props.onClick}>
      <Persona
        imageUrl={customer.profilePhoto}
        text={customer.name}
        secondaryText={customer.email}
        tertiaryText={customer.phoneNumber}
        size={PersonaSize.size72}
        imageAlt={customer.name}
      />
    </div>
  );
};
