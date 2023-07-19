import { Customer } from "./Customer";
import { ShipBase } from "./ShipBase";
import { ShipmentType } from "./ShipmentType";
import { User } from "./User";

export interface SalesOrder {
  id: number;
  salesDate: Date;
  invoiceDate: Date;
  user: User;
  customer: Customer;
  shipBase: ShipBase;
  shipmentType: ShipmentType;
  shippingCompanyName: string;
  shippingCompanyContact: string;
  shippingCompanyPhone: string;
  shippingCompanyEmail: string;
  mapsLink: string;
  addressHasUnpavedRoad: boolean;
  unpavedRoadSize: number;
  shippingNote: string;
  status: string;
}
