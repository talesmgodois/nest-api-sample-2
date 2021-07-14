import { AuthGuard } from './auth.guard';
import { IQuote, Quote } from './types';
import { Body, Controller, Delete, Get , NotFoundException, Param, Post, Put, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('quotes')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard)
  list(): Promise<IQuote[]> {
    return this.appService.list();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async listById(@Param() params: Record<string, any>): Promise<IQuote[]> {
    const { id } = params;
    const quote =  await this.appService.findById(id);
    if (!quote) {
      throw new NotFoundException();
    }
    return quote;
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() quote: Quote): Promise<IQuote> {
    return this.appService.create(quote);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  async update(@Body() quote: Quote, @Param() params): Promise<IQuote> {
      const { id } = params;
      return this.appService.update(id, quote);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async remove(@Param() params): Promise<void> {
      const { id } = params;
      return this.appService.delete(id);
  }
}
