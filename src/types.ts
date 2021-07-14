export interface IQuote {
  id?: string;
  createdAt: Date;
  author: string;
  quote: string;
}

export class Quote implements IQuote{
  id?: string;
  createdAt: Date;
  author: string;
  quote: string;
}