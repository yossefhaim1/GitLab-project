import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {
    getItems(){
        return [
            { id: "1", name: 'item1' },
            { id: "2", name: 'item2' },
            { id: "3", name: 'item3' }
        ];
    }

    getItemById(id: string) {
        const items = this.getItems();
        return items.find((item) => item.id === id);
    }
}
