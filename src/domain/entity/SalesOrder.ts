import { Customer } from "./Customer";
import { User } from "./User";

export interface SalesOrder {
  id: number;
  salesDate: Date;
  invoiceDate: Date;
  user: User;
  customer: Customer;
  shipBase: string;
  shipmentType: string;
  shippingCompanyName: string;
  shippingCompanyContact: string;
  shippingCompanyPhone: string;
  shippingCompanyEmail: string;
  mapsLink: string;
  addressHasUnpavedRoad: boolean;
  unpavedRoadSize: number;
  status: string;
}
