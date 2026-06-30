import { Test, TestingModule } from '@nestjs/testing';
import { AssigneesController } from './assignee.controller';
import { beforeEach } from 'node:test';
import { describe } from 'node:test';
import expect from "expect";
import { it } from 'node:test';

describe('AssigneesController', () => {
  let controller: AssigneesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssigneesController],
    }).compile();

    controller = module.get<AssigneesController>(AssigneesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
