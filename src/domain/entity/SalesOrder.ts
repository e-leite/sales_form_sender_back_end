import { Customer } from "./Customer";
import { PaymentTerm } from "./PaymentTerm";
import { ShipBase } from "./ShipBase";
import { ShipmentType } from "./ShipmentType";
import { User } from "./User";

export interface SalesOrder {
  id: number;
  salesDate: Date;
  invoiceDate: Date;
  user: User;
  customer: Omit<Customer, "paymentTerm">;
  ship: {
    base: Omit<ShipBase, "daysForAvailability">;
    type: ShipmentType;
    shippingCompanyName: string;
    shippingCompanyContact: string;
    shippingCompanyPhone: string;
    shippingCompanyEmail: string;
  };
  paymentTerm: PaymentTerm;
  status: string;
}
