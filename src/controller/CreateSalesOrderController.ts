import { SalesOrder } from "../domain/entity/SalesOrder";
import { ICreateSalesOrderRepository } from "../domain/repository/ICreateSalesOrderRepository";
import {
  HttpRequest,
  HttpResponse,
  IController,
  badRequest,
  created,
} from "./helpers";

export class CreateSalesOrderController implements IController<SalesOrder> {
  constructor(
    private readonly createSalesOrderRepository: ICreateSalesOrderRepository,
  ) {}
  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<SalesOrder | string>> {
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
      "userGetFirstPriceRange",
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
      "Usuário recebe primeira faixa de preço",
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

    try {
      const salesOrderOutputDto = await this.createSalesOrderRepository.execute(
        httpRequest.body,
      );

      const createdSalesOrder: SalesOrder = {
        id: salesOrderOutputDto.id,
        salesDate: new Date(salesOrderOutputDto.salesDate),
        invoiceDate: new Date(salesOrderOutputDto.invoiceDate),
        user: {
          id: salesOrderOutputDto.userId,
          name: salesOrderOutputDto.userName,
          email: salesOrderOutputDto.userEmail,
          getFirstPriceRange: false,
          managerName: salesOrderOutputDto.managerName,
          managerEmail: salesOrderOutputDto.managerEmail,
        },
        customer: {
          id: salesOrderOutputDto.customerId,
          name: salesOrderOutputDto.customerName,
          address: {
            city: salesOrderOutputDto.customerCity,
            state: salesOrderOutputDto.customerState,
            mapsLink: salesOrderOutputDto.mapsLink,
            hasUnpavedRoad: salesOrderOutputDto.addressHasUnpavedRoad,
            unpavedRoadSize: salesOrderOutputDto.unpavedRoadSize,
          },
        },
        ship: {
          base: {
            id: salesOrderOutputDto.shipBaseId,
            name: salesOrderOutputDto.shipBaseName,
          },
          type: {
            id: salesOrderOutputDto.shipmentTypeId,
            type: salesOrderOutputDto.shipmentTypeName,
          },
          shippingCompanyName: salesOrderOutputDto.shippingCompanyName,
          shippingCompanyContact: salesOrderOutputDto.shippingCompanyContact,
          shippingCompanyPhone: salesOrderOutputDto.shippingCompanyPhone,
          shippingCompanyEmail: salesOrderOutputDto.shippingCompanyEmail,
        },
        paymentTerm: {
          id: salesOrderOutputDto.paymentTermId,
          term: salesOrderOutputDto.paymentTermName,
        },
        status: salesOrderOutputDto.status,
      };

      return created<SalesOrder>(createdSalesOrder);
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong!",
      };
    }
  }
}
