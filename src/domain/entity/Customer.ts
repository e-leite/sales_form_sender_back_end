import { PaymentTerm } from "./PaymentTerm";

export interface Customer {
  id: number;
  name: string;
  address: {
    city: string;
    state: string;
    hasUnpavedRoad: boolean;
    unpavedRoadSize: number;
    mapsLink: string;
  };
  paymentTerm: PaymentTerm;
}
