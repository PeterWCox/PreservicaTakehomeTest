import { useQuery } from "@tanstack/react-query";
import "./App.css";
import axios from "axios";
import { Text } from "@fluentui/react/lib/Text";
import {
  Persona,
  PersonaSize,
  PersonaPresence,
} from "@fluentui/react/lib/Persona";
import { Customer } from "../models/Customer";

export const Customers = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      //Introduce a fake 1s delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      //Make a request to the server using axios and add CORS headers
      const response = await axios.get("https://localhost:7142/api/Customers");
      return response.data as Customer[];
    },
  });

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    const initials = parts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.substring(0, 1),
      ""
    );
    return initials;
  };

  return (
    <div className="container">
      {/* Heading */}
      <Text variant="xxLarge">Customers</Text>

      {isLoading && <Text>Loading...</Text>}

      {data?.map((customer: any) => (
        <Persona
          imageUrl={
            customer.profilePictureUrl ?? "https://picsum.photos/300/300"
          }
          imageInitials={getInitials(customer.name)}
          text={customer.name}
          secondaryText="Software Engineer"
          tertiaryText="In a meeting"
          size={PersonaSize.size72}
          presence={PersonaPresence.offline}
          imageAlt={customer.name}
        />
      ))}
    </div>
  );
};
