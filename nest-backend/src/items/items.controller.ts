import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  getItems() {
    return this.itemsService.getItems();
  }

  @Get(':id')
  getItemById(@Param('id') id: string) {
    const item = this.itemsService.getItemById(id);
    return { item };
  }
}
