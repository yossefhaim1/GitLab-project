import { Controller , Get} from '@nestjs/common';
import {ItemTagService} from './ItamTag.service';

@Controller('itemTags')
export class ItemTagController {
    constructor(private readonly itemTagService: ItemTagService) {}

    @Get()
    getAllItemTags() {
        return this.itemTagService.getAllItemTags();
    }
}