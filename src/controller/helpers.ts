export interface IController<T> {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<T | string>>;
}

export interface HttpRequest<T> {
  body: T;
}

export interface HttpResponse<T> {
  body: T;
  statusCode: number;
}

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: 400,
    body: message,
  };
};

export const created = <T>(body: T): HttpResponse<T> => {
  return {
    statusCode: 201,
    body: body,
  };
};
