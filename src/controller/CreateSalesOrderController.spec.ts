interface HttpRequest<T> {
  body?: T;
}

class CreateSalesOrderController {
  handle(httpRequest: HttpRequest<InputCreateSalesOrderDto>) {
    if (
      httpRequest.body?.salesDate == null ||
      httpRequest.body.invoiceDate == null
    ) {
      return {
        statusCode: 400,
      };
    }
  }
}

interface InputCreateSalesOrderDto {
  salesDate: Date | null;
  invoiceDate: Date | null;
  userId: number;
  userName: string;
  userEmail: string;
  managerName: string;
  managerEmail: string;
  customerId: number;
  customerName: string;
  customerCity: string;
  customerState: string;
  customerPaymentTerm: string;
  shipBase: string;
  shipmentType: string;
  shippingCompanyName: string | null;
  shippingCompanyContact: string | null;
  shippingCompanyPhone: string | null;
  shippingCompanyEmail: string | null;
  mapsLink: string | null;
  addressHasUnpavedRoad: boolean;
  unpavedRoadSize: number | null;
  shippingNote: string | null;
  status: string;
}

describe("CreateSalesOrderController", () => {
  test("Should return status code 400 if salesDate is null.", () => {
    const sut = new CreateSalesOrderController();

    const httpRequest: HttpRequest<InputCreateSalesOrderDto> = {
      body: {
        salesDate: null,
        invoiceDate: new Date(Date.now()),
        userId: 1,
        userName: "any_user",
        userEmail: "any_email",
        managerName: "any_manager",
        managerEmail: "anay_email",
        customerId: 1,
        customerName: "any_customer",
        customerCity: "any_city",
        customerState: "any_state",
        customerPaymentTerm: "any_term",
        shipBase: "any_base",
        shipmentType: "any_type",
        shippingCompanyName: null,
        shippingCompanyContact: null,
        shippingCompanyPhone: null,
        shippingCompanyEmail: null,
        mapsLink: null,
        addressHasUnpavedRoad: true,
        unpavedRoadSize: null,
        shippingNote: null,
        status: "string",
      },
    };

    const response = sut.handle(httpRequest);
    expect(response?.statusCode).toBe(400);
  });

  test("Should return status code 400 if invoiceDate is null.", () => {
    const sut = new CreateSalesOrderController();

    const httpRequest: HttpRequest<InputCreateSalesOrderDto> = {
      body: {
        salesDate: new Date(Date.now()),
        invoiceDate: null,
        userId: 1,
        userName: "any_user",
        userEmail: "any_email",
        managerName: "any_manager",
        managerEmail: "anay_email",
        customerId: 1,
        customerName: "any_customer",
        customerCity: "any_city",
        customerState: "any_state",
        customerPaymentTerm: "any_term",
        shipBase: "any_base",
        shipmentType: "any_type",
        shippingCompanyName: null,
        shippingCompanyContact: null,
        shippingCompanyPhone: null,
        shippingCompanyEmail: null,
        mapsLink: null,
        addressHasUnpavedRoad: true,
        unpavedRoadSize: null,
        shippingNote: null,
        status: "string",
      },
    };

    const response = sut.handle(httpRequest);
    expect(response?.statusCode).toBe(400);
  });
});
