import { Injectable } from '@nestjs/common';

@Injectable()
export class ColumnsService {
    getColumns(){
        return [
            { id: "1", name: 'column1' },
            { id: "2", name: 'column2' },
            { id: "3", name: 'column3' }
        ];
    }

    getColumnById(id: string) {
        const columns = this.getColumns();
        return columns.find((column) => column.id === id);
    }


}
