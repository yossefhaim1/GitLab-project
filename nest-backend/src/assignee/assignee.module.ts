import { Module } from '@nestjs/common';
import { AssigneesService } from './assignee.service';
import { AssigneesController} from './assignee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssigneeEntity } from '../Entity/assignee.entity';
import { AssigneeRepository } from './assignee.Repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssigneeEntity])
  ],
  providers: [AssigneesService, AssigneeRepository],
  controllers: [AssigneesController]
})
export class AssigneeModule {}
