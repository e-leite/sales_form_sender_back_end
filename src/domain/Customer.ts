import { PaymentTerm } from "./PaymentTerm";

export interface Customer {
  id: number;
  name: string;
  city: string;
  state: string;
  paymentTerm: PaymentTerm;
}
