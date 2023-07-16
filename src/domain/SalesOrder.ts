import { Customer } from "./Customer";
import { ShipBase } from "./ShipBase";
import { ShipmentType } from "./ShipmentType";
import { User } from "./User";

export interface SalesOrder {
  id: number;
  salesDate: Date;
  invoiceDate: Date;
  shippingCompanyName: string;
  shippingCompanyContact: string;
  shippingCompanyPhone: string;
  shippingCompanyEmail: string;
  mapsLing: string;
  addressHasUnpavedRoad: boolean;
  unpavedRoadSize: number;
  shippingNote: string;
  status: string;
  customer: Customer;
  shipBase: ShipBase;
  user: User;
  shipmentType: ShipmentType;
}
