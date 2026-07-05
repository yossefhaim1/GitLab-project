export type CreateColumnDto = {
    title: string;
    boardId: number;
    order: number;
    color: string;
}

export type UpdateColumnDto = {
    title?: string;
    order?: number;
    color?: string;
}