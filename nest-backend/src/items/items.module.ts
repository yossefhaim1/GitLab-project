import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { ItemEntity } from '../Entity/item.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ItemRepository } from './Item.Repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemEntity])
  ],
  providers: [ItemsService, ItemRepository],
  controllers: [ItemsController]
})
export class ItemsModule {}
