export interface ICreateSalesOrderRepository {
  execute(inputData: any): Promise<CreateSalesOrderOutputDto>;
}

export type CreateSalesOrderInputDto = {
  salesDate: string;
  invoiceDate: string;
  userId: number;
  userName: string;
  userEmail: string;
  userGetFirstPriceRange: boolean;
  managerName: string;
  managerEmail: string;
  customerId: number;
  customerName: string;
  customerCity: string;
  customerState: string;
  customerPaymentTerm: string;
  shipBase: string;
  shipmentType: string;
  shippingCompanyName: string;
  shippingCompanyContact: string;
  shippingCompanyPhone: string;
  shippingCompanyEmail: string;
  mapsLink: string;
  addressHasUnpavedRoad: boolean;
  unpavedRoadSize: number;
  shippingNote: string;
  status: string;
};

export type CreateSalesOrderOutputDto = {
  id: number;
  salesDate: string;
  invoiceDate: string;
  userId: number;
  userName: string;
  userEmail: string;
  userGetFirstPriceRange: boolean;
  managerName: string;
  managerEmail: string;
  customerId: number;
  customerName: string;
  customerCity: string;
  customerState: string;
  customerPaymentTerm: string;
  shipBase: string;
  shipmentType: string;
  shippingCompanyName: string;
  shippingCompanyContact: string;
  shippingCompanyPhone: string;
  shippingCompanyEmail: string;
  mapsLink: string;
  addressHasUnpavedRoad: boolean;
  unpavedRoadSize: number;
  shippingNote: string;
  status: string;
};
