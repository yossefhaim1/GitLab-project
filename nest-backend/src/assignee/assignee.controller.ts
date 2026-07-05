import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {AssigneesService } from './assignee.service';
import type { CreateAssigneeDto } from './dto/assignee.dto';
import type { UpdateAssigneeDto } from './dto/assignee.dto';
import { CreateAssigneeSchema } from './schemas/assignee.schema';
import { UpdateAssigneeSchema } from './schemas/assignee.schema';
import { AssigneeDeleteResponseDto, AssigneeResponseDto } from './dto/assignee-response.dto';


@Controller('assignees')
export class AssigneesController {
  constructor(private readonly assigneesService: AssigneesService) {}

  @Get()
  getAssignees(): Promise<AssigneeResponseDto[]> {
    return this.assigneesService.getAssignees();
  }

  @Get('name/:name')
  getAssigneeByName(@Param('name') name: string): Promise<AssigneeResponseDto | null> {
    return this.assigneesService.getAssigneeByEntityAssignee({ name });
  }

  @Get(':id')
  getAssigneeById(@Param('id', ParseIntPipe) id: number): Promise<AssigneeResponseDto | null> {
    return this.assigneesService.getAssigneeByEntityAssignee({ id });
  }

  @Post()
  createAssignee(@Body() body: CreateAssigneeDto):
  Promise<AssigneeResponseDto> {
    const createAssigneeDto = CreateAssigneeSchema.parse(body);
    return this.assigneesService.createAssignee(createAssigneeDto);
  }

  @Patch(':id')
  updateAssignee(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAssigneeDto,
  ): Promise<AssigneeResponseDto | null> {
    const updateAssigneeDto = UpdateAssigneeSchema.parse(body);
    return this.assigneesService.updateAssignee(id, updateAssigneeDto);
  }

  @Delete(':id')
  deleteAssignee(@Param('id', ParseIntPipe) id: number)
  : Promise<AssigneeDeleteResponseDto> {
    return this.assigneesService.deleteAssignee(id);
  }
}
