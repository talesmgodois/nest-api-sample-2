import { IQuote } from './types';
import { Body, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {
  private quotes = [];

  async create(quote: IQuote): Promise<IQuote> {
    const newQuote = {
      ...quote,
      id: uuid(),
      createdAt: new Date(),
    }
    this.quotes.push(newQuote);
    return newQuote;
  }

  async list(): Promise<IQuote[]> {
    return this.quotes;
  }

  async findById(id: string): Promise<IQuote[]> {
    return this.quotes.find(quote => quote.id===id);
  }

  async update(id, quote): Promise<IQuote> {
    const foundQuote = await this.findById(id);
    const idx = this.quotes.indexOf(foundQuote);
    this.quotes[idx] = { ...foundQuote, ...quote }
    return this.quotes[idx];
  }

  async delete(id: string): Promise<void> {
    const foundQuote = await this.findById(id);
    const idx = this.quotes.indexOf(foundQuote);
    this.quotes.splice(idx,1);
  }
}
