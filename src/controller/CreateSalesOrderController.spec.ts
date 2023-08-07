interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<unknown>;
}

interface HttpRequest<T> {
  body: T;
}

interface HttpResponse<T> {
  body: T;
  statusCode: number;
}

const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: 400,
    body: message,
  };
};

class CreateSalesOrderController implements IController {
  async handle(httpRequest: HttpRequest<any>) {
    const { salesDate, invoiceDate, unpavedRoadSize, addressHasUnpavedRoad } =
      httpRequest.body;

    const salesDt = new Date(salesDate);
    const invoiceDt = new Date(invoiceDate);

    const requiredFields = [
      "salesDate",
      "invoiceDate",
      "userId",
      "userName",
      "userEmail",
      "managerName",
      "managerEmail",
      "customerId",
      "customerName",
      "customerCity",
      "customerState",
      "customerPaymentTerm",
      "shipBase",
      "shipmentType",
      "status",
    ];
    const requiredFieldsTranslated = [
      "Data do pedido",
      "Data de faturamento",
      "Id do usuário",
      "Nome do usuário",
      "Email do usuário",
      "Nome do Gerente",
      "Email do Gerente",
      "Id do cliente",
      "Nome do cliente",
      "Cidade do cliente",
      "Estado do cliente",
      "Prazo de pagamento",
      "Base de faturamento",
      "Tipo de frete",
      "Status",
    ];

    for (const field of requiredFields) {
      if (httpRequest.body?.[field] === null) {
        const indexOfField = requiredFields.indexOf(field);
        const translatedField = requiredFieldsTranslated[indexOfField];

        return badRequest(`O campo ${translatedField} não pode ser nulo.`);
      }
    }

    if (salesDt > invoiceDt) {
      return badRequest(
        "Data de faturamento não pode ser menor que data da solicitação.",
      );
    }

    if (addressHasUnpavedRoad && unpavedRoadSize === null) {
      return badRequest("Km de estrada de chão não pode ser nulo.");
    }
  }
}

const createSut = (): CreateSalesOrderController => {
  const createSalesOrderController = new CreateSalesOrderController();

  return createSalesOrderController;
};

describe("CreateSalesOrderController", () => {
  test("Should return status code 400 if salesDate is null.", async () => {
    const sut = new CreateSalesOrderController();

    const httpRequest = {
      body: {
        salesDate: null,
        invoiceDate: "2023-08-01",
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

    const response = await sut.handle(httpRequest);
    expect(response?.statusCode).toBe(400);
    expect(response?.body).toBe("O campo Data do pedido não pode ser nulo.");
  });

  test("Should return status code 400 if invoiceDate is null.", async () => {
    const sut = new CreateSalesOrderController();

    const httpRequest = {
      body: {
        salesDate: "2023-08-01",
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

    const response = await sut.handle(httpRequest);
    expect(response?.statusCode).toBe(400);
    expect(response?.body).toBe(
      "O campo Data de faturamento não pode ser nulo.",
    );
  });

  test("Should return status code 400 if salesDate is less than invoiceDate.", async () => {
    const sut = createSut();

    const httpRequest = {
      body: {
        salesDate: "2023-08-10",
        invoiceDate: "2023-08-05",
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

    const response = await sut.handle(httpRequest);
    expect(response?.statusCode).toBe(400);
    expect(response?.body).toBe(
      "Data de faturamento não pode ser menor que data da solicitação.",
    );
  });

  test("Should return status code 400 if userId is null.", async () => {
    const sut = new CreateSalesOrderController();

    const httpRequest = {
      body: {
        salesDate: "2023-08-01",
        invoiceDate: "2023-08-05",
        userId: null,
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

    const response = await sut.handle(httpRequest);
    expect(response?.statusCode).toBe(400);
  });

  test("Should return status code 400 if userNames is null", async () => {
    const sut = createSut();

    const httpRequest = {
      body: {
        salesDate: "2023-08-01",
        invoiceDate: "2023-08-05",
        userId: 1,
        userName: null,
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

    const response = await sut.handle(httpRequest);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toBe("O campo Nome do usuário não pode ser nulo.");
  });

  test("Should return status code 400 if userEmail is null", async () => {
    const sut = createSut();

    const httpRequest = {
      body: {
        salesDate: "2023-08-01",
        invoiceDate: "2023-08-05",
        userId: 1,
        userName: "any_name",
        userEmail: null,
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

    const response = await sut.handle(httpRequest);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toBe("O campo Email do usuário não pode ser nulo.");
  });

  test("Should return status code 400 if managerName is null", async () => {
    const sut = createSut();

    const httpRequest = {
      body: {
        salesDate: "2023-08-01",
        invoiceDate: "2023-08-05",
        userId: 1,
        userName: "any_name",
        userEmail: "any_name",
        managerName: null,
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

    const response = await sut.handle(httpRequest);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toBe("O campo Nome do Gerente não pode ser nulo.");
  });

  test("Should return status code 400 if managerEmail is null", async () => {
    const sut = createSut();

    const httpRequest = {
      body: {
        salesDate: "2023-08-01",
        invoiceDate: "2023-08-05",
        userId: 1,
        userName: "any_name",
        userEmail: "any_name",
        managerName: "any_name",
        managerEmail: null,
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

    const response = await sut.handle(httpRequest);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toBe("O campo Email do Gerente não pode ser nulo.");
  });

  test("Should return status code 400 if customerId is null", async () => {
    const sut = createSut();

    const httpRequest = {
      body: {
        salesDate: "2023-08-01",
        invoiceDate: "2023-08-05",
        userId: 1,
        userName: "any_name",
        userEmail: "any_name",
        managerName: "any_name",
        managerEmail: "any_name",
        customerId: null,
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

    const response = await sut.handle(httpRequest);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toBe("O campo Id do cliente não pode ser nulo.");
  });

  test("Should return status code 400 if customerId is null", async () => {
    const sut = createSut();

    const httpRequest = {
      body: {
        salesDate: "2023-08-01",
        invoiceDate: "2023-08-05",
        userId: 1,
        userName: "any_name",
        userEmail: "any_name",
        managerName: "any_name",
        managerEmail: "any_name",
        customerId: 1,
        customerName: null,
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

    const response = await sut.handle(httpRequest);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toBe("O campo Nome do cliente não pode ser nulo.");
  });

  test("Should return status code 400 if customerCity is null", async () => {
    const sut = createSut();

    const httpRequest = {
      body: {
        salesDate: "2023-08-01",
        invoiceDate: "2023-08-05",
        userId: 1,
        userName: "any_name",
        userEmail: "any_name",
        managerName: "any_name",
        managerEmail: "any_name",
        customerId: 1,
        customerName: "any_name",
        customerCity: null,
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

    const response = await sut.handle(httpRequest);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toBe("O campo Cidade do cliente não pode ser nulo.");
  });

  test("Should return status code 400 if customerState is null", async () => {
    const sut = createSut();

    const httpRequest = {
      body: {
        salesDate: "2023-08-01",
        invoiceDate: "2023-08-05",
        userId: 1,
        userName: "any_name",
        userEmail: "any_name",
        managerName: "any_name",
        managerEmail: "any_name",
        customerId: 1,
        customerName: "any_name",
        customerCity: "any_city",
        customerState: null,
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

    const response = await sut.handle(httpRequest);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toBe("O campo Estado do cliente não pode ser nulo.");
  });

  test("Should return status code 400 if customerPaymentTerm is null", async () => {
    const sut = createSut();

    const httpRequest = {
      body: {
        salesDate: "2023-08-01",
        invoiceDate: "2023-08-05",
        userId: 1,
        userName: "any_name",
        userEmail: "any_name",
        managerName: "any_name",
        managerEmail: "any_name",
        customerId: 1,
        customerName: "any_name",
        customerCity: "any_city",
        customerState: "any_state",
        customerPaymentTerm: null,
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

    const response = await sut.handle(httpRequest);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toBe(
      "O campo Prazo de pagamento não pode ser nulo.",
    );
  });

  test("Should return status code 400 if shipBase is null", async () => {
    const sut = createSut();

    const httpRequest = {
      body: {
        salesDate: "2023-08-01",
        invoiceDate: "2023-08-05",
        userId: 1,
        userName: "any_name",
        userEmail: "any_name",
        managerName: "any_name",
        managerEmail: "any_name",
        customerId: 1,
        customerName: "any_name",
        customerCity: "any_city",
        customerState: "any_state",
        customerPaymentTerm: "any_payment_term",
        shipBase: null,
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

    const response = await sut.handle(httpRequest);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toBe(
      "O campo Base de faturamento não pode ser nulo.",
    );
  });

  test("Should return status code 400 if shipmentType is null", async () => {
    const sut = createSut();

    const httpRequest = {
      body: {
        salesDate: "2023-08-01",
        invoiceDate: "2023-08-05",
        userId: 1,
        userName: "any_name",
        userEmail: "any_name",
        managerName: "any_name",
        managerEmail: "any_name",
        customerId: 1,
        customerName: "any_name",
        customerCity: "any_city",
        customerState: "any_state",
        customerPaymentTerm: "any_payment_term",
        shipBase: "any_base",
        shipmentType: null,
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

    const response = await sut.handle(httpRequest);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toBe("O campo Tipo de frete não pode ser nulo.");
  });

  test("Should return status code 400 if status is null", async () => {
    const sut = createSut();

    const httpRequest = {
      body: {
        salesDate: "2023-08-01",
        invoiceDate: "2023-08-05",
        userId: 1,
        userName: "any_name",
        userEmail: "any_name",
        managerName: "any_name",
        managerEmail: "any_name",
        customerId: 1,
        customerName: "any_name",
        customerCity: "any_city",
        customerState: "any_state",
        customerPaymentTerm: "any_payment_term",
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
        status: null,
      },
    };

    const response = await sut.handle(httpRequest);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toBe("O campo Status não pode ser nulo.");
  });

  test("Should return status code 400 if addressHasUnpavedRoad is true and unpavedRoadSize is null.", async () => {
    const sut = createSut();

    const httpRequest = {
      body: {
        salesDate: "2023-08-01",
        invoiceDate: "2023-08-05",
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

    const response = await sut.handle(httpRequest);
    expect(response?.statusCode).toBe(400);
    expect(response?.body).toBe("Km de estrada de chão não pode ser nulo.");
  });
});
