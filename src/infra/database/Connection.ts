export interface Connection {
  query(querystatement: string, value: string): Promise<any>;
  close(): Promise<void>;
}
